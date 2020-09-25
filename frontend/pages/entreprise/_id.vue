<template>
  <div>
    <v-row>
     <entrepriseinfo></entrepriseinfo>
   <!--    <entrepriseDonneurOrdre ></entrepriseDonneurOrdre>--> 
    </v-row>
    <v-row>
     <!--   <entreprisePdpEnCours v-if="isPdpEnCours"></entreprisePdpEnCours>--> 
    </v-row>
    <v-row>
       <entreprisePdpEnCoursBis v-if="isPdpEnCours"></entreprisePdpEnCoursBis>
    </v-row>
    <v-row>
        <entreprisePdpArchive v-if="isPdpArchive"></entreprisePdpArchive>
    </v-row>
  </div>
</template>

<script>
import entrepriseinfo from "~/components/entreprise/entrepiseinfo";
import entrepriseDonneurOrdre from "~/components/entreprise/entrepriseDonneurOrdre";
import entreprisePdpEnCours from "~/components/entreprise/entreprisePdpEnCours"
import entreprisePdpEnCoursBis from '~/components/entreprise/entreprisePdPEnCoursBis'
import entreprisePdpArchive from "~/components/entreprise/entreprisePdpArchive"

export default {
  components: {
    entrepriseinfo,
    entrepriseDonneurOrdre,
    entreprisePdpEnCours,
    entreprisePdpArchive,
    entreprisePdpEnCoursBis
  },

  computed:{
    isPdpEnCours(){
      return this.$store.getters['entreprise/pdpEnCours']
    },
    isPdpArchive(){
      return this.$store.getters['entreprise/pdpArchive'].length>0
    }
  },

  async fetch({store,route}){
    await store.dispatch('entreprise/fetchEntrepriseById',route.params.id)
  },

};
</script>

<style>
</style>