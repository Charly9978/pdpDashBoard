

export const state = () => ({
    status:[]
})

export const getters = {
     getStatusById:(state)=>(id)=>{
        return   state.status.find((statut)=> statut.id === id)
    } 
}

export const mutations =  {
    setStatus(state,status){
        state.status = status
    }
}

