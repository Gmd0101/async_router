import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.baseURL = 'http://localhost:3002';
function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        });
    });
}

export default { fetchGet, fetchPost }