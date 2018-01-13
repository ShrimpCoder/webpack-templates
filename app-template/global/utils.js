
export function getHomePage() {
    const homePage = location.origin + location.pathname.replace(/\/.*\.html/, '/');

    return homePage;
}

export function getQuery(name) {
    const url = decodeURIComponent(location.href);
    const search = location.search.substr(1) || url.split('?')[1] || '';
    const hash = location.hash.substr(1) || url.split('?')[1] || '';
    const data = Object.assign(parseQuery(search), parseQuery(hash));
    const result = name ? data[name] : data;
    return result ? result : undefined;
}

export function parseQuery(query) {
    const str = decodeURIComponent(query);
    let result = {},
        param = '',
        params = [];

    if (str) params = str.split('&');

    for (let i = 0; i < params.length; i++) {
        param = params[i].split('=');
        param[0] ? (result[param[0]] = param[1] === undefined ? null : param[1]) : '';
    }

    return result;
}

/***
 * cookie 操作类
 * @type {{getCookie: (()), setCookie: (()), deleteCookie: (())}}
 */
export const COOKIE_HANDLER = {
    getCookie (name) {
        let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr !== null) {
            return decodeURIComponent(arr[2]);
        }
        return null;
    },
    setCookie (name, value, timer, setPath, setDomain) {
        let Days = timer || 30; // 默认30天
        let Path = setPath || ''; // 设置存储路径
        let Domain = setDomain || ''; // 设置存储域名
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + (Path ? ';path=' + Path : '') + (Domain ? ';domain=' + Domain : '');
    },
    deleteCookie (name) {
        this.setCookie(name, '', -1);
    }
};
