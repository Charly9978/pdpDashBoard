<template>
<div>
<entrepriseCard v-for="entreprise in resultQuery" :key="entreprise.id" :entreprise="entreprise"></entrepriseCard>
</div>
</template>

<script>
import {entreprisesQuery} from '~/graphql/queries/entreprise/entreprisesQuery'
import entrepriseCard from '~/components/entreprise/entrepriseCard'
export default {

    components:{
        entrepriseCard
    },

    async asyncData(context){
        const resp = await context.$api.request({
            data: entreprisesQuery
        })

        return {
            entreprises: resp.data.entreprises
        }
    },

    computed:{
        searchQuery(){
            return this.$store.state.navbar.search
        },

        resultQuery(){
      if(this.searchQuery){
      return this.entreprises.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.nom.toLowerCase().includes(v))
      })
      }else{
        return this.entreprises;
      }
    }
    }

}
</script>

<style>

</style>