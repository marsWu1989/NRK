import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { IntlProvider, addLocaleData } from 'react-intl';


import zh from 'react-intl/locale-data/zh';
import zhCN from './../locale/zh_CN';

import web_pc_route from './../projects/web_pc/routes/client';
import web_m_route from './../projects/web_m/routes/client';
import foxio_pc_route from './../projects/foxio_pc/routes/client';
const project = process.env.NODE_ENV;
const routes = {
    web_pc: web_pc_route,
    web_m: web_m_route,
    foxio_pc: foxio_pc_route
}
const Routers = routes[project];
console.log(Routers, project)
addLocaleData(zh);
// render first screen
const temp = (content) => (
`<!DOCTYPE html>
<html>
<head>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?361a69a27c886fe12e52cbec0cb83bcc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

<meta charset="utf-8">
<title>ClearGrass 青萍</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<link rel="stylesheet" href="/${project}/styles/app.css">
<link rel="apple-touch-icon" sizes="57x57" href="/favicons181009/apple-icon-57x57.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="60x60" href="/favicons181009/apple-icon-60x60.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="72x72" href="/favicons181009/apple-icon-72x72.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="76x76" href="/favicons181009/apple-icon-76x76.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="114x114" href="/favicons181009/apple-icon-114x114.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="120x120" href="/favicons181009/apple-icon-120x120.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="144x144" href="/favicons181009/apple-icon-144x144.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="152x152" href="/favicons181009/apple-icon-152x152.png?time=${new Date().getTime()}">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons181009/apple-icon-180x180.png?time=${new Date().getTime()}">
<link rel="icon" type="image/png" sizes="192x192"  href="/favicons181009/android-icon-192x192.png?time=${new Date().getTime()}">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons181009/favicon-32x32.png?time=${new Date().getTime()}">
<link rel="icon" type="image/png" sizes="96x96" href="/favicons181009/favicon-96x96.png?time=${new Date().getTime()}">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons181009/favicon-16x16.png?time=${new Date().getTime()}">
<link rel="manifest" href="/favicons181009/manifest.json?time=${new Date().getTime()}">
<meta name="msapplication-TileColor" content="#000">
<meta name="msapplication-TileImage" content="/favicons181009/ms-icon-144x144.png?time=${new Date().getTime()}">
<meta name="theme-color" content="#000">
<style>
    @font-face {
        font-family: 'commonFont';
        font-style: normal;
        font-weight: 400;
        src: url('/font/FZLTXHJW.TTF') format("truetype");
    }
    @font-face {
        font-family: 'numFont';
        src: url('/font/MIUIEXNomal.ttf');
    }
</style>
</head>
<body>
<div id="app">${content}</div>
<script>window.__INITIAL_STATE__ = ${serialize()}</script>
<script src="/library/react.js"></script>
<script src="/${project}/scripts/app.js"></script>
</body>
</html>`
);
// render 404
const notFound = status => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ClearGrass</title>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="../${project}/styles/app.css">
<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<link rel="manifest" href="/favicons/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<style>
.error {
    width: 400px;
    height: 0px;
    margin: 5% auto 0;
    padding: 400px 0 0 0;
    text-align: center;
    background: url(/error.jpg) no-repeat center;
    background-size: cover;
}
span {
    display: block;
    margin-top: 20px;
    font-size: 14px;
    color: #f00;
    opacity: .6;
}
a {
    color: #333;
    display: block;
    margin-top: 10px;
    font-size: 16px;
    text-decoration: none;
}
a:hover {
    color: #000;
    text-decoration: underline;
}
</style>
</head>
<body>
<div id="app">${status}</div>
</body>
</html>`
);

const serverRoute = [
    '/',
    '/air',
    '/mi_temp_rh_monitor/privacy',
    '/mi_temp_rh_monitor/overview',
    '/mi_temp_rh_monitor/specifications',
    '/cg_temp_rh_monitor/overview',
    '/cg_temp_rh_monitor/specifications',
    '/temp_rh_barometer',
    '/air_monitor/overview',
    '/air_monitor/specifications',
    '/mi_multifunction_air_monitor/privacy',
    '/mi_air_monitor',
    '/store'
];

export default async (ctx, next) => {
    const match = serverRoute.reduce(
        (acc, route) =>
            matchPath(ctx.url.split('?')[0], route, { exact: true }) || acc, null
        );
    if (!match.isExact) {
        ctx.status = 404;
        const arr = ctx.request.url.split('/');
        if (arr[1] === 'amber' && arr.length > 2) {
            arr[2] = '#' + arr[2];
            ctx.redirect(arr.join('/'));
        }
        if (arr[1] === 'air_app_and_temp_rh_monitor' || arr[1] === 'air_app_and_air_monitor') {
            ctx.redirect('/air')
        } else {
            ctx.redirect('/')
        }
        // ctx.body = notFound(
        //     '<div class="error"><span>没有找到你想要的页面</span><a href="http://cleargrass.com/">返回首页</a></div>'
        // );
        return;
    }
    const context = {};
    const content = renderToStaticMarkup(
        <IntlProvider
            locale='zh-CN'
            messages={zhCN}
        >
            <Router
                location={ctx.url.split('?')[0]}
                context={context}
            >
                <Routers />
            </Router>
        </IntlProvider>
    );
    ctx.body = temp(content);

    await next();
};
