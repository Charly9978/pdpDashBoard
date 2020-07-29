<template>
  <div>
    <v-row>
     <entrepriseinfo :entreprise="entreprise" v-if="entreprise"></entrepriseinfo>
      <entrepriseDonneurOrdre :donneurOrdre="donneurOrdre" v-if="donneurOrdre" ></entrepriseDonneurOrdre>
    </v-row>
    <v-row>
        <entreprisePdpEnCours :pdpEnCours="pdpEnCours" v-if="pdpEnCours"></entreprisePdpEnCours>
    </v-row>
  </div>
</template>

<script>
import entrepriseinfo from "~/components/entreprise/entrepiseinfo";
import entrepriseDonneurOrdre from "~/components/entreprise/entrepriseDonneurOrdre";
import entreprisePdpEnCours from "~/components/entreprise/entreprisePdpEnCours"
import { entrepriseByIdQuery } from "~/graphql/queries/entrepriseByIdQuery";

export default {
  components: {
    entrepriseinfo,
    entrepriseDonneurOrdre,
    entreprisePdpEnCours
  },

  async asyncData({store,$api,route}){

    const response = await $api.request({
      data: entrepriseByIdQuery(route.params.id)
    });
    const {nom,adresse,contact,pdpEnCours,pdpArchive,id} = response.data.entreprise;
    const statusPdps = response.data.statusPdps.map(status=>{return {...status}})
    store.commit('statusPdp/setStatus',statusPdps)
    return{
      pdpEnCours: pdpEnCours[0],
      pdpArchive: pdpArchive,
      donneurOrdre: pdpEnCours[0].donneur_dordre,
      entreprise: {nom,adresse,contact,id}
    }
  },

};
</script>

<style>
</style>