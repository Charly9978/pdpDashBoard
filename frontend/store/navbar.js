export const state = ()=>({
    search:null,
    openDrawer: false
})

export const mutations = {
    SETVALUE(state, newValue){
        state.search = newValue

    },

    SETOPENDRAWER(state){
        state.openDrawer = !state.openDrawer
    },

    SETCLOSEDRAWER(state){
        state.openDrawer = false
    }
}