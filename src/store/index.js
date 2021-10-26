import Vue from 'vue'
import Vuex from 'vuex';
import oldState from './state'
import getters from './getters';

Vue.use(Vuex)
let cloneDeep =(data)=>{
    //copy一份数据
    return JSON.parse(JSON.stringify(data))
  }

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: cloneDeep(oldState),
    mutations:{
        user_token(state, token){
            state.user.access_token=token;
        },
        menuActive(state, active){
            state.menu.active = active;
        },
        menuOpeneds(state, arr){
            state.menu.menuOpeneds = arr;
        },
        logout(state){
            for(let key in oldState){
                state[key] = cloneDeep(oldState[key])
            }
        },
        topTabsData(state, str){
            state.menu.tabsData = str;
        },
    },
    actions:{
        user_token({commit}){
            commit('user_token')
        },
        logout({commit}){
            commit('logout')
        },
    },
    getters,
})

export default store;