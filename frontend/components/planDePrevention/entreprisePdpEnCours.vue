<template>
  <v-col cols="12">
    <v-card>
      <v-card-title primary-title>
        Plan de prévention en cours
        <v-spacer></v-spacer>
        <div v-if="$strapi.userIsAdmin">
        <v-tooltip v-if="!editMode && !createdModeStatut" bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" icon v-on:click="editMode = true">     
          <v-icon >mdi-pencil</v-icon>
        </v-btn>
          </template>
          <span>Modifier le plan existant</span>
        </v-tooltip>
        <v-tooltip v-if="!editMode && !createdModeStatut" bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" icon v-on:click="archivage">     
          <v-icon >mdi-archive</v-icon>
        </v-btn>
          </template>
          <span>Archiver le plan existant</span>
        </v-tooltip>
        <div v-else>
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs" v-on:click="save" :disabled="$v.pdpEnCoursData.$invalid">
            <v-icon >mdi-content-save</v-icon>
          </v-btn>
            </template>
          <span>Enregistrer les modifications</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" icon text v-on:click="cancel">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
            </template>
          <span>Annuler les modifications</span>
        </v-tooltip>
        </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field
              type="date"
              :readonly="!editMode && !createdModeStatut"
              v-model="$v.pdpEnCoursData.beginDate.$model"
              label="Date de signature"
              outlined
              :error-messages="errorBeginDate"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              type="date"
              v-model="$v.pdpEnCoursData.endDate.$model"
              label="Date de fin"
              outlined
              :readonly="!editMode && !createdModeStatut"
              :error-messages="errorEndDate"
              @change="updateStatus"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field 
            readonly 
            v-model="pdpEnCoursData.status_pdp.text" 
            label="Status" 
            outlined
            :error="pdpEnCoursData.status_pdp.id==='5f0f3116d59c9e007cd7b7c7'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="$v.pdpEnCoursData.descriptifIntervention.$model"
              label="Description de l'intervention"
              outlined
              :readonly="!editMode && !createdModeStatut"
              :error-messages="errorRequired"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="pdpEnCoursData.commentaires"
              label="Commentaire"
              outlined
              :readonly="!editMode && !createdModeStatut"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="url"
              v-model="pdpEnCoursData.urlDossierStockage"
              label="Lien vers le dossier de stockage"
              outlined
              :readonly="!editMode && !createdModeStatut"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="$v.pdpEnCoursData.urlPdf.$model"
              label="Liens vers le plan au format pdf"
              outlined
              :readonly="!editMode && !createdModeStatut"
              :error-messages="errorUrl"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { endDateOlderThanBegin,lessThan12Month, getStatusId } from "~/utils/moment";
import {updatePdpMutation} from '~/graphql/mutations/entreprise/updatePdpMutation'
import {
  required,
  url,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";


export default {


  data() {
    return {
      pdpEnCoursData: {...this.$store.getters['entreprise/pdpEnCours']},
      editMode: false,
      createdModeStatut: false

    };
  },

  validations: {
    pdpEnCoursData: {
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

    archivage(){
      this.$store.dispatch('entreprise/archiveEntreprisePdpEnCours',this.pdpEnCoursData.id)
    },

    updateStatus(){
      const statusId = getStatusId(this.pdpEnCoursData.endDate)
      const status = this.$store.getters["statusPdp/getStatusById"](statusId)
      this.pdpEnCoursData.status_pdp.text = status.text
      this.pdpEnCoursData.status_pdp.color = status.color
      this.pdpEnCoursData.status_pdp.id = status.id
    },

    cancel() {
      this.pdpEnCoursData = { ...this.$store.getters['entreprise/pdpEnCours'] };
      this.editMode = false;
      this.createdModeStatut = false
    },

    save() {
      this.$store.dispatch('entreprise/updateEntreprisePdpEnCours',this.pdpEnCoursData)
        .then(() => {
          console.log("enregistrement réussi");
          this.editMode = false;
        })
        .catch(e => {
          console.log(e);
          this.cancel();
        });
    },

    createdMode(){
      this.pdpEnCoursData.beginDate= undefined
      this.pdpEnCoursData.endDate = undefined
      this.pdpEnCoursData.commentaires= undefined
      this.createdModeStatut= true
    }
  },

  computed: {

    errorRequired() {
      const error = [];
      if (!this.$v.pdpEnCoursData.descriptifIntervention.required)
        error.push("Cette information est obligatoire");
      return error;
    },

    errorUrl() {
      const error = [];
      if (!this.$v.pdpEnCoursData.urlPdf.required)
        error.push("Cette information est obligatoire");
      if (!this.$v.pdpEnCoursData.urlPdf.url)
        error.push("Doit être une url valide");
      return error;
    },

    errorBeginDate() {
      const error = [];
      if (!this.$v.pdpEnCoursData.beginDate.required)
        error.push("La date de signature du pdp est obligatoire");
      return error;
    },

    errorEndDate() {
      const error = [];

      if (!this.$v.pdpEnCoursData.endDate.required)
        error.push("La date de fin de validité du pdp est obligatoire");

      if (!this.$v.pdpEnCoursData.endDate.endDateOlderThanBegin)
      error.push("La date de fin de validité ne peut être antérieur à la date de signature")

      if (!this.$v.pdpEnCoursData.endDate.lessThan12Month)
      error.push("La date de fin de validité ne doit pas dépasser un an")

      return error;
    }
  }
};
</script>

<style>
</style>