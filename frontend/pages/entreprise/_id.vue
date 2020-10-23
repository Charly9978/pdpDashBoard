<template>
  <div>
    <v-row>
     <entrepriseinfo :entreprise="entreprise"></entrepriseinfo>
   <!--    <entrepriseDonneurOrdre ></entrepriseDonneurOrdre>--> 
    </v-row>
    <v-row>
     <!--   <entreprisePdpEnCours v-if="isPdpEnCours"></entreprisePdpEnCours>--> 
    </v-row>
    <v-row>
       <entreprisePdpEnCoursBis :pdpEnCours="pdpEnCours"></entreprisePdpEnCoursBis> 
    </v-row>
    <v-row>
       <entreprisePdpArchive :pdpArchive="pdpArchive"></entreprisePdpArchive>
    </v-row>
  </div>
</template>

<script>
import entrepriseinfo from "~/components/entreprise/entrepiseinfo";
import entrepriseDonneurOrdre from "~/components/entreprise/entrepriseDonneurOrdre";
import entreprisePdpEnCoursBis from '~/components/entreprise/entreprisePdPEnCoursBis'
import entreprisePdpArchive from "~/components/entreprise/entreprisePdpArchive"
import {entrepriseByIdQuery} from "~/graphql/queries/entreprise/entrepriseByIdQuery"

export default {
  components: {
    entrepriseinfo,
    entrepriseDonneurOrdre,
    entreprisePdpArchive,
    entreprisePdpEnCoursBis
  },

  computed:{
    isPdpArchive(){
      return this.pdpArchive.length>0?true:false
    }
  },

  async asyncData(ctx){
    const id = ctx.params.id
    const resp = await ctx.$strapi.graphQl(entrepriseByIdQuery(id))
    console.log('resp', resp)
    return {
      entreprise:{
        id: resp.entreprise.id,
        nom: resp.entreprise.nom,
        adresse: resp.entreprise.adresse,
        contact: resp.entreprise.contact,
        principal_activity: resp.entreprise.principal_activity
      },
      pdpEnCours:resp.entreprise.pdpEnCours,
      pdpArchive: resp.entreprise.pdpArchive,
      statusPdps: resp.statusPdps
    }
  }

};
</script>

<style>
</style>