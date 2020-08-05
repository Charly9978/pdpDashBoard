import {entrepriseByIdQuery} from '~/graphql/queries/entrepriseByIdQuery'
import {updateEntrepriseMutation} from '~/graphql/mutations/entreprise/updateEntrepriseMutation'
import {updateDonneurDOrdre} from '~/graphql/mutations/entreprise/updateDonneurDOrdre'

export const state = ()=>({
    entreprise:{}

})

export const getters = {

}

export const mutations = {
    setEntreprise(state,entreprise){
        state.entreprise = entreprise
    },

    setEntrepriseInfos(state,entrepriseInfos){
        state.entreprise.nom= entrepriseInfos.nom
        state.entreprise.adresse= entrepriseInfos.adresse
        state.entreprise.contact = entrepriseInfos.contact
        state.entreprise.principal_activity = entrepriseInfos.principal_activity
    },

    SetEntrepriseDonneurDOrdre(state,donneurDOrdre){
        state.entreprise.donneur_dordre = donneurDOrdre  
    }
}

export const actions = {
    async fetchEntrepriseById({commit},entrepriseId){
        const response = await this.$api.request({
            data: entrepriseByIdQuery(entrepriseId)
        })
        commit('setEntreprise', {...response.data.entreprise})
        commit('statusPdp/setStatus',{...response.data.statusPdps},{root:true})
    },

    async updateEntrepriseInfosById({commit},entreprise){
        const response = await this.$api.request({
            data: updateEntrepriseMutation(entreprise)
        })
        console.log("response",response)
        commit('setEntrepriseInfos',{...response.data.updateEntreprise.entreprise})

    },

    async changeEntrepriseDonneurDOrdre({commit},{donneurDOrdreId,entrepriseId}){
        const response = await this.$api.request({
            data:updateDonneurDOrdre({donneurDOrdreId,entrepriseId})
        })
        commit('SetEntrepriseDonneurDOrdre',{...response.data.updateEntreprise.entreprise.donneur_dordre})
    }
}