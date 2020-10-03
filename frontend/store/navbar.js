export const state = ()=>({
    search:null
})

export const mutations = {
    SETVALUE(state, newValue){
        state.search = newValue

    }
}