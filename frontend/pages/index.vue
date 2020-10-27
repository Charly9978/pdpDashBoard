<template>
<v-container>
  <v-row>
    <pdpCard v-for="planDePrevention in planDePreventions" :key="planDePrevention.id" :planDePrevention="planDePrevention"></pdpCard>
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

  async asyncData(ctx){
    const response = await ctx.$strapi.graphQl(plansDePreventionsQuery)
    return {
      planDePreventions: response.planDePreventions
    }
  }

}

</script>
