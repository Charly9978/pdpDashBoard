export const state = ()=>({
    user:undefined
})

export const getters = {

    isLogin(state){
        return !state.user?false:true
    }

}

export const mutations = {

    SETUSER(state,user){
        state.user = user
    }
}