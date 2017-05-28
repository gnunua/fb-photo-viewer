//ToDo @Gnun implement proxy facebook interface

const fbFetch = (url, method = 'GET', fields = {}) =>
    new Promise(function (resolve, reject) {
        window.FB.api(url, method, fields,
            function ({error, data}) {
                if (error) {
                    reject(error);
                }
                resolve(data);
            }
        );
    });

const dummy = () => new Promise(function (reject, resolve) {
    reject('note implemented yet!');
});

const login = (callback, payload) => {
    window.FB.login(callback, payload);
};

const get = (url, fields) => fbFetch(url, 'GET', fields);

const post = () => dummy();

const put = () => dummy();

const del = () => dummy();

export default {
    login, get, post, put, delete: del
};