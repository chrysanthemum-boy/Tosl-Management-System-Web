// const {setToken} = require("@/utils/auth");
// const {getToken} = require("@/utils/auth");
//
// const users = {
//     state: {
//         token: getToken(),
//         user: {},
//         roles: [],
//         // 第一次加载菜单时用到
//         loadMenus: false
//     },
//
//     mutations: {
//         SET_TOKEN: (state, token) => {
//             state.token = token
//         },
//         SET_USER: (state, user) => {
//             state.user = user
//         },
//         SET_ROLES: (state, roles) => {
//             state.roles = roles
//         },
//         SET_LOAD_MENUS: (state, loadMenus) => {
//             state.loadMenus = loadMenus
//         }
//     },
//     actions: {
//         // 登录
//         Login({commit}, userInfo) {
//             const rememberMe = userInfo.rememberMe
//             return new Promise((resolve, reject) => {
//                 login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid).then(res => {
//                     setToken(res.token, rememberMe)
//                     commit('SET_TOKEN', res.token)
//                     setUserInfo(res.user, commit)
//                     // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
//                     commit('SET_LOAD_MENUS', true)
//                     resolve()
//                 }).catch(error => {
//                     reject(error)
//                 })
//             })
//         },
//     }
// }