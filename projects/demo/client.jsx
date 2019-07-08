import React from 'react';
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
"ji", "zu"]; */