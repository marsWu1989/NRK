const fs = require('fs');
const buffer = require('buffer');
const project = process.argv.splice(2);
console.log(process);
let package = fs.readFileSync('./package.json', 'utf8').split('\n'); 
if (project.length < 1) {
    console.log("项目名有误")
    return;
}
console.log(package);
const data = [
  `"start:${project}": "NODE_ENV=${project} node bin/entry.js",\n"build:${project}": "webpack --env.project=${project}",`
]
package.splice(6, 0, data);
fs.writeFileSync('./package.json', package.join('\n'), 'utf8')
const update_dir = {
    projectDir: `./projects/${project}`,
    compontentsDir: `./projects/${project}/components`,
    routesDir: `./projects/${project}/routes`,
    scssDir: `./projects/${project}/scss`,
    demoDir: `./projects/${project}/components/demo`,
    demo2Dir: `./projects/${project}/components/demo2`,
}
;(function() {

    if (fs.existsSync(`./projects/${project}`)) {
        console.log('项目名重复');
        return;
    } else {
        fs.mkdirSync(update_dir.projectDir);
        fs.mkdirSync(update_dir.compontentsDir);
        fs.mkdirSync(update_dir.routesDir);
        fs.mkdirSync(update_dir.scssDir);
        fs.mkdirSync(update_dir.demoDir);
        fs.mkdirSync(update_dir.demo2Dir);
        fs.open(`${update_dir.projectDir}/client.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
            fs.writeFile(
                `${update_dir.projectDir}/client.jsx`,
                `import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';

/*
*引入与navigator.languages[0]所对应的语言；
*如果没有引入对应的语言，会使用默认的“en”；
*导致FormattedMessage的映射不会成功；
*/
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
/*
*引入自定义的映射表；
*通过与FormattedMessage的id值来当索引映射返回值；
*/
import enUS from './../../locale/en_US';
import zhCN from './../../locale/zh_CN';

import Routers from './routes/client';
import configureStore from './store';


const store = configureStore();
/*
*messages是render()时IntlProvider组件所传的props，属性名固定：messages；
*messages返回值为映射表，比如：'react-intl/locale-data/zh'&&'./../locale/zh_CN'；
*/
const messages = {};
messages['en-US'] = enUS;
messages['zh-CN'] = zhCN;

addLocaleData([...zh, ...en]);

function GetQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}


let browserLanguage = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
console.log(browserLanguage.indexOf('zh') > -1);
if (browserLanguage.indexOf('zh') > -1) {
    browserLanguage = 'zh-CN';
} else {
    browserLanguage = 'en-US';
}
// if (browserLanguage !== 'en-US' && browserLanguage !== 'zh-CN') {
//     browserLanguage = 'zh-CN';
// }
const lang = GetQueryString('locale') || browserLanguage;
render(
        <IntlProvider
            locale={lang}
            messages={messages[lang]}
            key={lang}
        >
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </IntlProvider>,
    document.getElementById('app')
    );

/*
浏览器languages大全：
"af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM",
    "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg",
    "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en",
    "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM",
    "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU",
    "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu",
    "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl",
    "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb",
    "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO",
    "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI",
"es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh",
"ji", "zu"]; */`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 client.jsx 成功！");
                   console.log("--------我是分割线-------------")
                }
            );
           console.log("文件 client.jsx 打开成功！");
        });
        fs.open(`${update_dir.projectDir}/project.json`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
            fs.writeFile(
                `${update_dir.projectDir}/project.json`,
                `{
    "package_name": "${project}"
}`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 project.json 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 project.json 打开成功！");
        });
        fs.open(`${update_dir.projectDir}/reducer.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
           fs.writeFile(
                `${update_dir.projectDir}/reducer.jsx`,
                `import { combineReducers } from 'redux';

const rootReducer = combineReducers({
});

export default rootReducer;`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 reducer.jsx 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 reducer.jsx 打开成功！");
        });
        fs.open(`${update_dir.projectDir}/store.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
           fs.writeFile(
                `${update_dir.projectDir}/store.jsx`,
                `import { combineReducers } from 'redux';

const rootReducer = combineReducers({
});

export default rootReducer;`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 store.jsx 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 store.jsx 打开成功！");
        });
        
        fs.open(`${update_dir.routesDir}/client.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
           fs.writeFile(
                `${update_dir.routesDir}/client.jsx`,
                `import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import Demo from './../components/demo';
import Demo2 from './../components/demo2';

const Routers = () => (
    <Switch>
        <Route path="/" exact component={Demo} />
        <Route path="/demo2" exact component={Demo2} />
    </Switch>
);

export default Routers;`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 routes/client.jsx 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 routes/client.jsx 打开成功！");
        });
        fs.open(`${update_dir.scssDir}/_reset.scss`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
           fs.writeFile(
                `${update_dir.scssDir}/_reset.scss`,
                `html {
    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
    outline: 0;
    font-size: 12px;
    font-family: "PingFang SC","Microsoft YaHei";
}
// reset default margin
body,
ul,
p,
dl,
dd,
h1,
h2,
h3 {
    margin: 0;
}

// reset default padding
ul {
    padding: 0;
}

ul,
li {
    list-style: none;
}

body {
    margin: 0 auto;
    background: #eeeeee;
}

h1,
h2,
h3,
em,
b,
strong {
    font-weight: 100;
}

%clearfix{
    &:before,
    &:after {
        content: ' ';
        display: table;
        font: 0/0 a;
    }
    &:after {
        clear: both;
    }
}
sup {
    vertical-align: super;
    font-size: smaller;
}
%large {
    padding: 0 0 10px 0;
    font-size: 36px;
    font-weight: bold;
    opacity: .9;
}
%little {
    padding: 0 0 10px 0;
    font-size: 20px;
    // opacity: .8;
}
%normal {
    padding: 0 0 10px 0;
    font-size: 15px;
    font-weight: 300;
}
%small {
    padding: 0 0 10px 0;
    font-size: 12px;
    font-weight: 300;
}
`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 scss/_reset.scss 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 scss/_reset.scss 打开成功！");
        });
 
        fs.open(`${update_dir.demoDir}/index.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error('1111', err);
           }
           fs.writeFile(
                `${update_dir.demoDir}/index.jsx`,
                `import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Demo';
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = { // 初始state
            index: 0,
        };
    }
    render() {
        
        return (
            <div className={s.demo} ref="demo">
                <NavLink to="/demo2">to demo2</NavLink>
            </div>
        );
    }
}

export default Demo;`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 demo index 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 demo index 打开成功！");
        });
        fs.open(`${update_dir.demoDir}/demo.scss`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
            fs.writeFile(
                `${update_dir.demoDir}/demo.scss`,
                `@import "./../../scss/_reset.scss";
                 
.demo {
    color: red;
}

.demo {
    a {
        color: green;
    }
}`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 demo scss 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 demo scss 打开成功！");
        });
        fs.open(`${update_dir.demo2Dir}/index.jsx`, 'w', (err, fd) => {
            if (err) {
               return console.error(err);
           }
            fs.writeFile(
                `${update_dir.demo2Dir}/index.jsx`,
                `import React, { Component } from 'react';
class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = { // 初始state
            index: 0,
        };
    }
    render() {
        
        return (
            <div ref="demo2">
                hello world
            </div>
        );
    }
}

export default Demo2;`,
                err => {
                   if (err) {
                       return console.error(err);
                   }
                   console.log("数据写入 demo2 index 成功！");
                   console.log("--------我是分割线-------------")
                }
            )
           console.log("文件 demo2 index 打开成功！");
          console.log('项目创建成功');
        });
    }
})();