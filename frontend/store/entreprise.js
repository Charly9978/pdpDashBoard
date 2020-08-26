import {entrepriseByIdQuery} from '~/graphql/queries/entrepriseByIdQuery'
import {updateEntrepriseMutation} from '~/graphql/mutations/entreprise/updateEntrepriseMutation'
import {updateDonneurDOrdre} from '~/graphql/mutations/entreprise/updateDonneurDOrdre'
import {updatePdpMutation} from '~/graphql/mutations/entreprise/updatePdpMutation'
import {archivePdpMutation} from '~/graphql/mutations/entreprise/archivePdpMutation'

export const state = ()=>({
    entreprise:{}

})

export const getters = {
    pdpEnCours: state => state.entreprise.pdpEnCours[0],
    pdpArchive: state => state.entreprise.pdpArchive,
    isPdpEnCours: state => state.entreprise.pdpEnCours[0]!=undefined?true:false,
    idOfLastPdpArchive: state =>[...state.entreprise.pdpArchive].reverse()[0].id
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
    },

    setPdpEnCours(state,pdp){
        state.entreprise.pdpEnCours = [pdp]
    },

    setArchivePdp(state,pdp){
        state.entreprise.pdpEnCours = []
        state.entreprise.pdpArchive.push(pdp)
    },

    removeLastPdpArchive(state){
        state.entreprise.pdpArchive.pop()
    }


}

export const actions = {
    async fetchEntrepriseById({commit},entrepriseId){
        const response = await this.$api.request({
            data: entrepriseByIdQuery(entrepriseId)
        })
        console.log("statusPdp",response.data.statusPdps)
        commit('setEntreprise', {...response.data.entreprise})
        commit('statusPdp/setStatus',[...response.data.statusPdps],{root:true})
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
    },

    async updateEntreprisePdpEnCours({commit},pdp){
        const response = await this.$api.request({
            data: updatePdpMutation(pdp)
        })
        commit('setPdpEnCours',{...response.data.updatePlanDePrevention.planDePrevention})
    },

    async archiveEntreprisePdpEnCours({commit},pdpId){
        const response = await this.$api.request({
            data: archivePdpMutation({
                id:pdpId,
                archivage: true
            })
        })
        commit('setArchivePdp',{...response.data.updatePlanDePrevention.planDePrevention})
    },

    async reactivePdp({commit},pdpId){
        const response = await this.$api.request({
            data: archivePdpMutation({
                id:pdpId,
                archivage: false
            })
        }) 
        commit('setPdpEnCours',{...response.data.updatePlanDePrevention.planDePrevention})
        commit('removeLastPdpArchive')
    }
}