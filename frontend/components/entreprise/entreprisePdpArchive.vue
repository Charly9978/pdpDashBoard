<template>
  <v-col cols="12">
    <v-card v-if="!isPdpArchive">
      <v-card-title>Plans de prévention archivés</v-card-title>
        <v-card-subtitle>
          Aucun document archivé
        </v-card-subtitle> 
    </v-card>
    <v-card v-else>
      <v-card-title>Plans de prévention archivés
        <v-spacer></v-spacer>
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
  props:{
    pdpArchive:{
      required: true,
      type: Array
    }
  },

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
      ]
     };
  },

  computed:{
    isPdpArchive(){
      return this.pdpArchive.length>0?true:false
    }
  },
};
</script>

<style>
</style>