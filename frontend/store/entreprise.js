import {entrepriseByIdQuery} from '~/graphql/queries/entreprise/entrepriseByIdQuery'
import {updateEntrepriseMutation} from '~/graphql/mutations/entreprise/updateEntrepriseMutation'
import {updateDonneurDOrdre} from '~/graphql/mutations/entreprise/updateDonneurDOrdre'
import {updatePdpMutation} from '~/graphql/mutations/entreprise/updatePdpMutation'
import {archivagePdpMutation} from '~/graphql/mutations/planDePrevention/archivagePdpMutation'
import {createPdp} from '~/graphql/mutations/entreprise/createPdp'

export const state = ()=>({
    entreprise:{}

})

export const getters = {
    pdpEnCours: state => state.entreprise.pdpEnCours,
    pdpArchive: state => state.entreprise.pdpArchive,
    isPdpEnCours: state => state.entreprise.pdpEnCours.length>0?true:false,
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
        const response = await this.$strapi.graphQl(
            entrepriseByIdQuery(entrepriseId)
        )
        console.log("statusPdp",response.statusPdps)
        commit('setEntreprise', {...response.entreprise})
        commit('statusPdp/setStatus',[...response.statusPdps],{root:true})
    },

    async updateEntrepriseInfosById({commit},entreprise){
        const response = await this.$strapi.graphQl(
            updateEntrepriseMutation(entreprise)
        )
        console.log("response",response)
        commit('setEntrepriseInfos',{...response.updateEntreprise.entreprise})

    },

    async changeEntrepriseDonneurDOrdre({commit},{donneurDOrdreId,entrepriseId}){
        const response = await this.$strapi.graphQl(
            updateDonneurDOrdre({donneurDOrdreId,entrepriseId})
        )
        commit('SetEntrepriseDonneurDOrdre',{...response.updateEntreprise.entreprise.donneur_dordre})
    },

    async updateEntreprisePdpEnCours({commit},pdp){
        const response = await this.$strapi.graphQl(updatePdpMutation(pdp))
        commit('setPdpEnCours',{...response.updatePlanDePrevention.planDePrevention})
    },

    async archiveEntreprisePdpEnCours({commit},pdpId){
        const response = await this.$strapi.graphQl(
            archivagePdpMutation({
                id:pdpId,
                archivage: true
            })
        )
        commit('setArchivePdp',{...response.updatePlanDePrevention.planDePrevention})
    },

    async reactivePdp({commit},pdpId){
        const response = await this.$strapi.graphQl(
            archivePdpMutation({
                id:pdpId,
                archivage: false
            })
        ) 
        commit('setPdpEnCours',{...response.updatePlanDePrevention.planDePrevention})
        commit('removeLastPdpArchive')
    },

    async creatNewPdp({commit,getters,dispatch},pdp){
        const response = await this.$strapi.graphQl(createPdp(pdp))
        if (getters.isPdpEnCours){
            const idPdPToArchive = getters.pdpEnCours.id
            console.log('idPdp',idPdPToArchive)
            await dispatch('archiveEntreprisePdpEnCours',idPdPToArchive)
        }
        commit('setPdpEnCours',{...response.createPlanDePrevention.planDePrevention})
    }
}