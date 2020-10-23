<template>
  <v-col cols="12">
    <v-card>
      <v-card-title primary-title>
        Plan de prévention
        <v-spacer></v-spacer>
        <div v-if="$strapi.isUserAdmin">
          <v-tooltip v-if="!editMode && !createdModeStatut" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
              v-on="on" 
              v-bind="attrs" 
              icon 
              v-on:click="edit"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Modifier le plan</span>
          </v-tooltip>
          <v-tooltip v-if="!editMode && !createdModeStatut" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
              v-on="on" 
              v-bind="attrs" 
              icon 
              v-on:click="archivage"
              >
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </template>
            <span>Archiver le plan</span>
          </v-tooltip>
          <div v-else>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-on="on"
                  v-bind="attrs"
                  v-on:click="save"
                  :disabled="$v.pdp.$invalid"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Enregistrer les modifications</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                v-on="on" 
                v-bind="attrs" 
                icon 
                text 
                v-on:click="cancel"
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </template>
              <span>Annuler les modifications</span>
            </v-tooltip>
          </div>
        </div>
      </v-card-title>

      <v-card-text>
        <v-divider class="mb-6"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Entreprise"
              readonly
              v-model="pdp.entreprise.nom"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Actvité principale"
              readonly
              v-model="pdp.entreprise.principal_activity"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row v-if="!editMode">
          <v-col cols="5">
            <v-text-field
              label="Donneur d'ordre"
              readonly
              :value="`${pdp.user.nom} ${pdp.user.prenom}`"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Service"
              readonly
              :value="`${pdp.user.service_soitec.nomService}`"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="5">
              <v-autocomplete
                v-model="user"
                :items="users"
                :item-text="item => `${item.nom} ${item.prenom}`"
                item-value="id"
                label="Donneur d'ordre"
                :background-color= editBackGroundColor
                outlined
              ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Service"
              readonly
              :value="userService"
              outlined
            ></v-text-field>
          </v-col>          
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row>
          <v-col cols="4">
            <v-text-field
              type="date"
              :readonly="!editMode && !createdModeStatut"
              v-model="$v.pdp.beginDate.$model"
              label="Date de signature"
              outlined
              :background-color= editBackGroundColor
              :error-messages="errorBeginDate"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              type="date"
              v-model="$v.pdp.endDate.$model"
              label="Date de fin"
              outlined
              :background-color= editBackGroundColor
              :readonly="!editMode && !createdModeStatut"
              :error-messages="errorEndDate"
              @change="updateStatus"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              readonly
              v-model="pdp.status_pdp.text"
              label="Status"
              outlined
              :error="pdp.status_pdp.id === '5f0f3116d59c9e007cd7b7c7'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="$v.pdp.descriptifIntervention.$model"
              label="Description de l'intervention"
              outlined
              :background-color= editBackGroundColor
              :readonly="!editMode && !createdModeStatut"
              :error-messages="errorRequired"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="pdp.commentaires"
              label="Commentaire"
              outlined
              :background-color= editBackGroundColor
              :readonly="!editMode && !createdModeStatut"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="url"
              v-model="pdp.urlDossierStockage"
              label="Lien vers le dossier de stockage"
              outlined
              :background-color= editBackGroundColor
              :readonly="!editMode && !createdModeStatut"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="$v.pdp.urlPdf.$model"
              label="Liens vers le plan au format pdf"
              outlined
              :background-color= editBackGroundColor
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
import {
  endDateOlderThanBegin,
  lessThan12Month,
  getStatusId,
} from "~/utils/moment";
import { planDePreventionById } from "~/graphql/queries/planPrevention/planDePreventionById";
import { updatePdpMutation } from "~/graphql/mutations/planDePrevention/updatePdpMutation";
import { archivagePdpMutation } from "~/graphql/mutations/planDePrevention/archivagePdpMutation"
import {
  required,
  url,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";

export default {
  async asyncData(context) {
    const resp = await context.$strapi.graphQl(planDePreventionById(context.params.id));
    return {
      pdp: resp.planDePrevention,
      status: resp.statusPdps,
      users : resp.users
    };
  },

  data() {
    return {
      editMode: false,
      createdModeStatut: false,
      localStoreData: undefined,
      users: [],
      user: null,
    };
  },

  validations: {
    pdp: {
      urlPdf: {
        required,
        url,
      },
      beginDate: {
        required,
      },
      endDate: {
        required,
        lessThan12Month,
        endDateOlderThanBegin,
      },
      descriptifIntervention: {
        required,
      },
    },
  },

  methods: {
    archivage() {
/*       this.$store.dispatch(
        "entreprise/archiveEntreprisePdpEnCours",
        this.pdp.id
      ); */
    },

    updateStatus() {
      const statusId = getStatusId(this.pdp.endDate);
      const status = this.status.find(status => status.id === statusId);
      this.pdp.status_pdp.text = status.text;
      this.pdp.status_pdp.color = status.color;
      this.pdp.status_pdp.id = status.id;
    },

    edit() {
      this.localStoreData = JSON.parse(JSON.stringify(this.pdp));
      this.editMode = true;
      this.user = this.pdp.user.id
    },

    cancel() {
      this.pdp = JSON.parse(JSON.stringify(this.localStoreData))
      this.localStoreData = undefined;
      this.editMode = false;
      this.createdModeStatut = false;
    },


    async save() {
      try {
        const resp = await this.$strapi.graphQl(
          updatePdpMutation({...this.pdp, user: this.user})
        )
        console.log('resp', resp)
        this.editMode = false;
        
      } catch (error) {
        console.log(error);
        this.cancel();
      }
    },

    createdMode() {
      this.pdp.beginDate = undefined;
      this.pdp.endDate = undefined;
      this.pdp.commentaires = undefined;
      this.createdModeStatut = true;
    },


  },

  computed: {

    userService(){
      if(this.editMode && this.users.length>0 && this.user){
        const user = this.users.find(user=> user.id === this.user)
        return user.service_soitec.nomService
      }

    },

    editBackGroundColor(){
      return this.editMode?"blue lighten-5":""
    },
    
    errorRequired() {
      const error = [];
      if (!this.$v.pdp.descriptifIntervention.required)
        error.push("Cette information est obligatoire");
      return error;
    },

    errorUrl() {
      const error = [];
      if (!this.$v.pdp.urlPdf.required)
        error.push("Cette information est obligatoire");
      if (!this.$v.pdp.urlPdf.url) error.push("Doit être une url valide");
      return error;
    },

    errorBeginDate() {
      const error = [];
      if (!this.$v.pdp.beginDate.required)
        error.push("La date de signature du pdp est obligatoire");
      return error;
    },

    errorEndDate() {
      const error = [];

      if (!this.$v.pdp.endDate.required)
        error.push("La date de fin de validité du pdp est obligatoire");

      if (!this.$v.pdp.endDate.endDateOlderThanBegin)
        error.push(
          "La date de fin de validité ne peut être antérieur à la date de signature"
        );

      if (!this.$v.pdp.endDate.lessThan12Month)
        error.push("La date de fin de validité ne doit pas dépasser un an");

      return error;
    },
  },
};
</script>

<style>
</style>