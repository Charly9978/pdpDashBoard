<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>Plans de prévention archivés</v-card-title>
      <v-card-text>
        <v-data-table 
        :headers="headers" 
        :items="pdpArchive" 
        :items-per-page="5" 
        class="elevation-1"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
    data(){
        return{
            headers:[
                {
                    text:"Date de signature",
                    value: 'beginDate'
                },
                {
                    text: "Nom du donneur d'ordre",
                    value: 'donneur_dordre.nom'
                }
            ],
            pdpArchive:this.$store.getters['entreprise/pdpArchive']
        }
    }
};
</script>

<style>
</style>