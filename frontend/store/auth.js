export const state = ()=>({
    user:undefined
})

export const getters = {

    isLogin(state){
        return !state.user?false:true
    },

    initials(state){
        const userName = state.user.username
        const userNameArray = userName.split('.')
        const firstLetter = userNameArray[0].charAt(0).toUpperCase()
        const lastLetter = userNameArray[1].charAt(0).toUpperCase()
        return firstLetter+lastLetter
    }

}

export const mutations = {

    SETUSER(state,user){
        state.user = user
    }
}