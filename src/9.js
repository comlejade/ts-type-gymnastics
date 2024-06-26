"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseQueryString(queryStr) {
    if (!queryStr || !queryStr.length) {
        return {};
    }
    const queryObj = {};
    const items = queryStr.split("&");
    items.forEach((item) => {
        const [key, value] = item.split("=");
        if (queryObj[key]) {
            if (Array.isArray(queryObj[key])) {
                queryObj[key].push(value);
            }
            else {
                queryObj[key] = [queryObj[key], value];
            }
        }
        else {
            queryObj[key] = value;
        }
    });
    return queryObj;
}
const res = parseQueryString("a=1&b=2&c=3");
res.a;
res.b;
res.c;
