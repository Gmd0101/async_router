import http from './http';

export function getRouters(params) {
    return http.fetchPost('/demo/demo', params);
}
export function login(params) {
    return http.fetchPost('/demo/log', params);
}