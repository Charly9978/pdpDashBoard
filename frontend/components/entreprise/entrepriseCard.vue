<template>
<div>
    <validation :text="validationText" :openValidation="openValidation" @yes="deleteEntreprise" @no="openValidation = false"></validation>
<v-card :color='!isPdpEnCours?"grey lighten-3":"white"'>
    <v-card-title primary-title class="test">
        {{entreprise.nom}}
        <v-spacer></v-spacer>
            <div  v-if="!isPdpEnCours" class="text-subtitle-1">Pas de plans de prévention en cours</div>
        <v-spacer></v-spacer>
        <v-card-actions>
        <v-btn v-if="$auth.isAdmin && !isPdp" rounded color="primary" icon dark @click="openValidation = true">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn rounded color="primary" icon dark nuxt :to="`/entreprise/${entreprise.id}`">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        </v-card-actions>        
    </v-card-title>

    <v-card-subtitle>{{entreprise.principal_activity}}</v-card-subtitle>
</v-card> 
</div> 
</template>

<script>
import validation from '~/components/utilities/Validation'
import {deleteEntrepriseMutation} from '~/graphql/mutations/entreprise/deleteEntrepriseMutation'

export default {

    components:{
        validation
    },

    props:{
        entreprise:{
            type: Object,
        }
    },

    data(){
        return{
            isPdpEnCours:this.entreprise.plan_de_preventions.filter(pdp=>pdp.Archiver == false).length>0?true:false,
            isPdp: this.entreprise.plan_de_preventions.length>0?true:false,
            validationText:"Etes vous sûr de vouloir supprimer cette entreprise? Cette action est définitive!",
            openValidation:false
        }
    },

    methods:{
        async deleteEntreprise (){
            this.openValidation = false
            try {
                await this.$api.request({
                    data: deleteEntrepriseMutation(this.entreprise.id)
                })
                this.$emit('deleteEntreprise', this.entreprise.id) 
            } catch (error) {
                console.log(error)
            }
        }

    }

}
</script>

<style>


</style>