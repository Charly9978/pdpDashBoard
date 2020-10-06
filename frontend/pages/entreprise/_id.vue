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
    const resp = await ctx.$api.request({
      data:entrepriseByIdQuery(id)
    })
    console.log('resp', resp)
    return {
      entreprise:{
        id: resp.data.entreprise.id,
        nom: resp.data.entreprise.nom,
        adresse: resp.data.entreprise.adresse,
        contact: resp.data.entreprise.contact,
        principal_activity: resp.data.entreprise.principal_activity
      },
      pdpEnCours:resp.data.entreprise.pdpEnCours,
      pdpArchive: resp.data.entreprise.pdpArchive,
      statusPdps: resp.data.statusPdps
    }
  }

};
</script>

<style>
</style>