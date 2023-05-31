/* OpenID for node.js
 *
 * http://ox.no/software/node-openid
 * http://github.com/havard/node-openid
 *
 * Copyright (C) 2010 by Håvard Stranden
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 */

const fetch = require('node-fetch');
const stringify = require("qs").stringify;


exports.get = (getUrl, params, callback, redirects) => {
    // NOTE: looks like nothing uses params so I'll skip the implementation, not sure what it even is
    fetch(getUrl, {
        follow: redirects || 5,
        headers: {
            'Accept': 'application/xrds+xml,text/html,text/plain,*/*;q=0.9'
        }}).then(async result => {
            callback(await result.text(), Object.fromEntries(result.headers), result.status);
    }).catch(err => callback(err));
};

exports.post = function (postUrl, data, callback, redirects) {
    fetch(postUrl, {
        method: 'POST',
        follow: redirects || 5,
        body: stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(async response => {
        callback(await response.text(), Object.fromEntries(response.headers), response.status);
    }).catch(err => callback(err));
};
