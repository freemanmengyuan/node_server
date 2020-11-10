const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./lib/controller');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';
console.log('now env is' + process.env.NODE_ENV);

// 打印log 计算请求的响应时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 加载静态资源 如果路径是static开头的则只是静态解析
if (! isProduction) {
    let staticFiles = require('./lib/static_files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// 支持post请求
app.use(bodyParser());

// 加载模版文件 add nunjucks as view:
const templating = require('./lib/templating');
app.use(templating('views', {
    noCache: true, // 是否开启模版缓存
    watch: true
}));

// 注册控制器
app.use(controller('controller'));

app.listen(3000);
console.log('app started at port 3000...');