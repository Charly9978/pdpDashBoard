<template>
    <v-container fluid>
        <entrepriseFormCreation :openForm="openForm" @close="openForm=false"></entrepriseFormCreation>
        <v-row class="justify-center">
            <v-col cols=9>
                <div class="text-right">
            <v-btn color="primary" @click="openForm=true">Add a entreprise
                <v-icon>mdi-plus</v-icon>
            </v-btn>

                </div>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col cols=9>
<entrepriseCard v-for="entreprise in resultQuery" :key="entreprise.id" :entreprise="entreprise"></entrepriseCard>        

            </v-col>

        </v-row>

        
    </v-container>
</template>

<script>
import {entreprisesQuery} from '~/graphql/queries/entreprise/entreprisesQuery'
import entrepriseCard from '~/components/entreprise/entrepriseCard'
import entrepriseFormCreation from '~/components/entreprise/entrepriseFormCreation'

export default {

    components:{
        entrepriseCard,
        entrepriseFormCreation
    },

    async asyncData(context){
        const resp = await context.$api.request({
            data: entreprisesQuery
        })

        return {
            entreprises: resp.data.entreprises
        }
    },

    data(){
        return {
            openForm:false
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