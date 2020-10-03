<template>
<v-card :color='!isPdpEnCours?"grey lighten-3":"white"'>
    <v-card-title primary-title class="test">
        {{entreprise.nom}}
        <v-spacer></v-spacer>
            <div  v-if="!isPdpEnCours" class="text-subtitle-1">Pas de plans de prévention en cours</div>
        <v-spacer></v-spacer>
        <v-card-actions>
        <v-btn round color="primary" icon dark nuxt :to="`/entreprise/${entreprise.id}`">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        </v-card-actions>        
    </v-card-title>

    <v-card-subtitle>{{entreprise.principal_activity}}</v-card-subtitle>
</v-card>  
</template>

<script>
export default {
    props:{
        entreprise:{
            type: Object,
        }
    },

    data(){
        return{
            isPdpEnCours:this.entreprise.pdpEnCours.length>0?true:false
        }
    }

}
</script>

<style>
.test{
    justify-content: space-between;
}

</style>