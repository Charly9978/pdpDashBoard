<template>
  <v-col cols="12">
    <v-card >
      <v-card-title>Plans de prévention en cours
      </v-card-title>
      <v-card-text >
        <v-data-table
          :headers="headers"
          :items="pdpEnCours"
          :items-per-page="5"
          class="elevation-1"
          sort-by="beginDate"
          sort-desc
        >
          <template v-slot:[`item.open`]="{ item }">
            <v-btn icon @click.stop='test(item)'>
              <v-icon small>mdi-link</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.pdf`]="{ item }">
            <v-btn icon :href="item.urlPdf" @click.stop="" target="_blank">
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
          text: "Lien",
          value: "open"
        },
        {
          text: "Date de signature",
          value: "beginDate",
        },
        {
          text: "Nom du donneur d'ordre",
          value: "user.nom",
        },
        {
          text: 'Type de travaux',
          value: "descriptifIntervention"
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
    }
  },

  computed:{
    pdpEnCours(){
      return this.$store.getters['entreprise/pdpEnCours']
    }
  },

  methods:{
    test(item){
      this.$router.push(`/planDePrevention/${item.id}`)
    }
  }
}
</script>

<style>

</style>