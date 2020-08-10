<template>
  <div>
    <v-row>
     <entrepriseinfo></entrepriseinfo>
      <entrepriseDonneurOrdre ></entrepriseDonneurOrdre>
    </v-row>
    <v-row>
        <entreprisePdpEnCours v-if="isPdpEnCours"></entreprisePdpEnCours>
    </v-row>
  </div>
</template>

<script>
import entrepriseinfo from "~/components/entreprise/entrepiseinfo";
import entrepriseDonneurOrdre from "~/components/entreprise/entrepriseDonneurOrdre";
import entreprisePdpEnCours from "~/components/entreprise/entreprisePdpEnCours"

export default {
  components: {
    entrepriseinfo,
    entrepriseDonneurOrdre,
    entreprisePdpEnCours
  },

  computed:{
    isPdpEnCours(){
      return this.$store.getters['entreprise/pdpEnCours']
    }
  },

  async fetch({store,route}){
    await store.dispatch('entreprise/fetchEntrepriseById',route.params.id)
  },

};
</script>

<style>
</style>