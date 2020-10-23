<template>
<v-dialog
  v-model="openForm"
  persistent
  max-width="850px"
  transition="dialog-transition"
>
  
  <v-col cols="12">
    <v-card>
      <v-card-title primary-title>
        Enregistrement d'un nouveau plan de prévention
        <v-spacer></v-spacer>
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs" v-on:click="save" :disabled="$v.newPdp.$invalid">
            <v-icon >mdi-content-save</v-icon>
          </v-btn>
            </template>
          <span>Enregistrer le nouveau plan</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon text v-on:click="cancel">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
            </template>
          <span>Annuler l'enregistrement</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field
              type="date"
              v-model="$v.newPdp.beginDate.$model"
              label="Date de signature"
              outlined
              :error-messages="errorBeginDate"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="date"
              v-model="$v.newPdp.endDate.$model"
              label="Date de fin"
              outlined
              :error-messages="errorEndDate"
              @change="updateStatus"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
            readonly 
            v-model="newPdp.status_pdp.text" 
            label="Status" 
            outlined
            :error="newPdp.status_pdp.id==='5f0f3116d59c9e007cd7b7c7'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="$v.newPdp.descriptifIntervention.$model"
              label="Description de l'intervention"
              outlined
              :error-messages="errorRequired"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="newPdp.commentaires"
              label="Commentaire"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="url"
              v-model="newPdp.urlDossierStockage"
              label="Lien vers le dossier de stockage"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="$v.newPdp.urlPdf.$model"
              label="Liens vers le plan au format pdf"
              outlined
              :error-messages="errorUrl"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
  </v-dialog>
</template>

<script>
import { endDateOlderThanBegin, lessThan12Month, getStatusId } from "~/utils/moment";
import {
  required,
  url,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";


export default {

  props:{
    openForm:{
      type: Boolean,
      required: true
    }
  },


  data() {
    return {
      newPdp: {
        beginDate:"",
        endDate:"",
        Archiver:false,
        descriptifIntervention:this.$store.getters['entreprise/isPdpEnCours']?[...this.$store.state.entreprise.entreprise.pdpEnCours][0].descriptifIntervention:[...this.$store.state.entreprise.entreprise.pdpArchive].reverse()[0].descriptifIntervention,
        urlDossierStockage:"",
        entreprise:this.$store.state.entreprise.entreprise.id,
        status_pdp:{},
        commentaires:"",
        urlPdf:"",
        user:this.$strapi.user.id
      },
    };
  },

  validations: {
    newPdp: {
      urlPdf: {
        required,
        url
      },
      beginDate: {
        required
      },
      endDate: {
        required,
        lessThan12Month,
        endDateOlderThanBegin
      },
      descriptifIntervention: {
        required
      }
    }
  },

  methods: {

    updateStatus(){
      const statusId = getStatusId(this.newPdp.endDate)
      const status = this.$store.getters["statusPdp/getStatusById"](statusId)
      this.$set(this.newPdp.status_pdp,'text',{...status}.text)
      this.$set(this.newPdp.status_pdp,'color',{...status}.color)
      this.$set(this.newPdp.status_pdp,'id',{...status}.id)
    },

    cancel() {
      this.newPdp = {
        beginDate:"",
        endDate:"",
        Archiver:false,
        descriptifIntervention:this.$store.getters['entreprise/isPdpEnCours']?[...this.$store.state.entreprise.entreprise.pdpEnCours][0].descriptifIntervention:[...this.$store.state.entreprise.entreprise.pdpArchive].reverse()[0].descriptifIntervention,
        urlDossierStockage:"",
        entreprise:this.$store.state.entreprise.entreprise.id,
        status_pdp:{},
        commentaires:"",
        urlPdf:"",
        user:this.$strapi.user.id
      };
      this.$emit('close')
    },

    save() {
      this.$store.dispatch('entreprise/creatNewPdp',this.newPdp)
        .then(() => {
          console.log("enregistrement réussi");
          this.$emit('close')
        })
        .catch(e => {
          console.log(e);
          //afficher un message
          this.cancel();
        });
    },
  },

  computed: {

    errorRequired() {
      const error = [];
      if (!this.$v.newPdp.descriptifIntervention.required)
        error.push("Cette information est obligatoire");
      return error;
    },

    errorUrl() {
      const error = [];
      if (!this.$v.newPdp.urlPdf.required)
        error.push("Cette information est obligatoire");
      if (!this.$v.newPdp.urlPdf.url)
        error.push("Doit être une url valide");
      return error;
    },

    errorBeginDate() {
      const error = [];
      if (!this.$v.newPdp.beginDate.required)
        error.push("La date de signature du pdp est obligatoire");
      return error;
    },

    errorEndDate() {
      const error = [];

      if (!this.$v.newPdp.endDate.required)
        error.push("La date de fin de validité du pdp est obligatoire");

      if (!this.$v.newPdp.endDate.endDateOlderThanBegin)
      error.push("La date de fin de validité ne peut être antérieur à la date de signature")

      if (!this.$v.newPdp.endDate.lessThan12Month)
      error.push("La date de fin de validité ne doit pas dépasser un an")

      return error;
    }
  }
};
</script>

<style>
</style>