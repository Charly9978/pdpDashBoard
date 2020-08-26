<template>
  <div>
      <entrepriseNewPdpCreation/>
  </div>
</template>

<script>
import entrepriseNewPdpCreation from '@/components/entreprise/entrepriseNewPdpCreation'

export default {
    components:{
      entrepriseNewPdpCreation
    },
    async fetch({store}){
    await store.dispatch('entreprise/fetchEntrepriseById',"5f08c58ab3e7b10117a6e602")
  },

    

}
</script>

<style>

</style>