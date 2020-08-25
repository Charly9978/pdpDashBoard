<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>Plans de prévention archivés
        <v-spacer></v-spacer>
        <v-tooltip v-if="!isPdpEnCours" bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" icon v-on:click="reactiveLastPdp">     
          <v-icon >mdi-restart</v-icon>
        </v-btn>
          </template>
          <span>Réactiver le dernier plan archivé</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="pdpArchive"
          :items-per-page="5"
          class="elevation-1"
          sort-by="beginDate"
          sort-desc
        >
          <template v-slot:[`item.pdf`]="{ item }">
            <v-btn icon :href="item.urlPdf" target="_blank">
              <v-icon small>mdi-file-pdf</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.folder`]="{ item }">
            <v-btn icon :href="item.urlDossierStockage" target="_blank">
              <v-icon small>mdi-folder</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {

      headers: [
        {
          text: "Date de signature",
          value: "beginDate",
        },
        {
          text: "Nom du donneur d'ordre",
          value: "donneur_dordre.nom",
        },
        { text: "Doc pdf",
          value: "pdf",
          sortable: false
        },
        { text: "Dossier",
          value: "folder",
          sortable: false
        },
      ],
      pdpArchive: this.$store.getters["entreprise/pdpArchive"],
    };
  },

  computed:{
    isPdpEnCours(){
      return this.$store.getters['entreprise/isPdpEnCours']
    }
  },

  methods:{
   async reactiveLastPdp(){
     try {
       const lastPdpId = this.$store.getters['entreprise/idOfLastPdpArchive']
       await this.$store.dispatch('entreprise/reactivePdp',lastPdpId)
     } catch (error) {
       console.log(error)
     }
    }
  }
};
</script>

<style>
</style>