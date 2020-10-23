<template>
<v-container>
  <v-row>
    <pdpCard v-for="planDePrevention in planDePreventions" :key="planDePrevention.id" v-bind:planDePrevention="planDePrevention"></pdpCard>
  </v-row>
  
</v-container>
  
</template>

<script>
import {plansDePreventionsQuery} from '~/graphql/queries/planPrevention/plandepreventions'
import pdpCard from '~/components/pdpCard'

export default {

  components:{
    pdpCard
  },

  data(){
    return {
      planDePreventions:[],
    }
  },
//pas besoin de created avec nuxt utilisé asyncData
  async created(){
    const response = await this.$strapi.graphQl(plansDePreventionsQuery)
    this.planDePreventions = response.planDePreventions
  }

}

</script>
