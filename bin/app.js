import Koa from 'koa';
import serve from 'koa-static';
import onerror from 'koa-onerror';
import convert from 'koa-convert';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';

import logger from './../lib/logger';
// import routes from './../server/routes';
import render from './../lib/render';

const app = new Koa();
const projectConfig = require(`./../projects/${process.env.NODE_ENV}/project.json`);
// let domainName;
// if (port == '9522') {
//     domainName = 'https://cleargrass.com';
// } if (port == '9525') {
//     domainName = 'https://m.foxio.me';
// } if (port == '9524') {
//     domainName = 'https://foxio.me';
// } else { // 9523
//     domainName = 'https://m.cleargrass.com';
// }
app.use(convert(cors()));
app.use(convert(serve(__dirname + '/../assets')));
app.use(convert(serve(__dirname + '/../public', {maxAge: 60 * 60 * 1000})));
app.use(async(ctx, next) => {
    const ua = ctx.headers['user-agent'];
    if (
            (/AppleWebKit.*Mobile/i.test(ua) ||
            (
                /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua)
            )) && !/iPad/.test(ua)
    ) {

        if (projectConfig[`${process.env.NODE_ENV}_redirect`]) {
            const url = projectConfig[`${process.env.NODE_ENV}_redirect`] + ctx.url;
            ctx.redirect(url);
        } else {
            await next();
        }
    } else {
        if (projectConfig[`${process.env.NODE_ENV}_redirect`]) {
            await next();
        } else {
            const url = projectConfig[`${process.env.NODE_ENV}_redirect`] + ctx.url;
            ctx.redirect(url);
        }
    }
});

app.context.logger = logger;

app.use(convert(bodyParser()));

app.use(async(ctx, next) => {
    // if (ctx.path.match(/^\/api/)) {
    //     console.log("API routes");
    //     return await routes.routes()(ctx, next);
    // }
    console.log("Client Page");
    return await render(ctx, next); // 客户端渲染
});

app.on('error', function(err, ctx) {
    ctx.logger.error('server error', err);
});

onerror(app);

app.listen(projectConfig.port, () => {
    console.log('Server run on: http://0.0.0.0:%d', projectConfig.port);
});
