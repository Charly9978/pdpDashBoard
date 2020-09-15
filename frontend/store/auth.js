export const state = ()=>({
    user:{}
})

export const getters = {

    getUser(state){
        return state.user
    },

    isLogin(state){
        return !state.user?false:true
    }

}

export const mutations = {

    SETUSER(state,user){
        state.user = user
    }
}