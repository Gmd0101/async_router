const login = {
    state: {
        role: sessionStorage.getItem('ROLE'),
        newrouter: [],
        tags: sessionStorage.getItem('TAGS')
    },
    mutations: {
        GET_ROLE: (state, role) => {
            state.role = role;
        },
        SET_ROUTER: (state, newrouter) => {
            state.newrouter = newrouter;
        },
        SET_TAGS: (state, tags) => {
            state.tags = tags;
        }
    },
    actions: {
        Login({ commit }, role) {
            return new Promise(function (resolve, reject) {
                commit('GET_ROLE', role);
                sessionStorage.setItem('ROLE', role);
                resolve(role);
            }).catch(function (error) {
                reject(error);
            });
        },
        LoginOut({ commit }, role) {
            return new Promise(function (resolve, reject) {
                commit('GET_ROLE', '');
                commit('SET_ROUTER', []);
                sessionStorage.removeItem('ROLE');
                location.reload();
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        },
        Route({ commit }, newrouter) {
            return new Promise((resolve, reject) => {
                commit('SET_ROUTER', newrouter);
                resolve(newrouter);
            }).catch(error => {
                reject(error);
            });
        },
        ADDTAGS({ commit }, tags) {
            return new Promise((resolve, reject) => {
                commit('SET_TAGS', tags);
                sessionStorage.setItem('TAGS', JSON.stringify(tags));
                resolve(tags);
            }).catch((error) => {
                reject(error);
            });
        }
    }
};
export default login;