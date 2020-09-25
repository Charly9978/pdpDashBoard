export const state = () => ({
    user:undefined
})

export const getters = {

    isLogin(state){
        return !state.user? false : true
    },

    initials(state){
       if (state.user){
        const userName = state.user.username
        const userNameArray = userName.split('.')
        const firstLetter = userNameArray[0].charAt(0).toUpperCase()
        const lastLetter = userNameArray[1].charAt(0).toUpperCase()
        return firstLetter+lastLetter
        }else{
            return null
        }
    }

}

export const mutations = {

    SETUSER(state,user){
        state.user = user
    }
}