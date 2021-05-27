import Vue from 'vue'
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        user:{
            access_token:'',
            refresh_token:'',
        },
        meetingcode: 1002,
        userType: 0,//0为订货端，1为管理端
    },
    mutations:{
        user_token(state, token){
            state.user.access_token=token;
        }
    },

    //getters,
})

export default store;