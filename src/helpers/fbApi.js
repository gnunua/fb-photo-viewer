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

const login = (callback, payload) => {
    window.FB.login(callback, payload);
};

const get = (url, fields) => fbFetch(url, 'GET', fields);

const post = () => {
    console.warn('note implemented yet!');
};
const put = () => () => {
    console.warn('note implemented yet!');
};
const del = () => () => {
    console.warn('note implemented yet!');
};

export default {
    login, get, post, put, delete: del
};