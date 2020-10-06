<template>
  <v-col cols="12">
    <v-card>
      <validation :openValidation='openValidation' :text='text' v-on:no="openValidation=false" v-on:yes='activeForm'></validation>
     <!-- <entrepriseNewPdpCreation :openForm='openForm' v-on:close='openForm=false'></entrepriseNewPdpCreation>-->
      <v-card-title primary-title>
        Entreprise
        <v-spacer></v-spacer>
        <div v-if="$auth.isAdmin">
        <v-tooltip v-if="!editMode" bottom>
            <template v-slot:activator="{ on, attrs }">
        <v-btn  v-on="on" v-bind="attrs" icon v-on:click="editMode = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
            </template>
            <span>Modifier les informations sur l'entreprise</span>
        </v-tooltip>
        <div v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" icon v-on:click="save">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Enregistrer les modifications</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" icon v-on:click="cancel">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </template>
            <span>Annuler les modifications</span>
          </v-tooltip>
        </div>
        </div>
      </v-card-title>
      <v-card-text>
      <v-row>
        <v-col cols="6">
        <v-text-field
          v-model="entrepriseDatas.nom"
          label="Nom de l'entreprise"
          outlined
          :readonly="!editMode"
          :autofocus="editMode"
          :background-color= editBackGroundColor
        ></v-text-field>
        </v-col>
        <v-col cols="6">
        <v-text-field
          v-model="entrepriseDatas.adresse"
          label="Adresse"
          outlined
          :readonly="!editMode"
          :background-color= editBackGroundColor
        ></v-text-field>
        </v-col>
        <v-col cols="6">
        <v-text-field
          v-model="entrepriseDatas.principal_activity"
          label="Activité principale"
          outlined
          hint="Pour les entreprises avec plusieurs activité. Ex: Applied polissage et Applied implant"
          persistent-hint
          :readonly="!editMode"
          :background-color= editBackGroundColor
        ></v-text-field>
        </v-col>
        <v-col cols="6">
        <v-text-field
          type="email"
          v-model="entrepriseDatas.contact"
          label="Email du repésentant de l'entreprise"
          outlined
          :readonly="!editMode"
          :background-color= editBackGroundColor
        ></v-text-field>
        </v-col>
      </v-row>
      </v-card-text>
      <v-card-actions  class="justify-center pb-7" > 
        <v-btn color="info" v-on:click.prevent="openValidation=true" :disabled="!$auth.isAdmin">Enregistrer un nouveau plan de prévention</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import validation from '~/components/utilities/Validation'
import entrepriseNewPdpCreation from '~/components/entreprise/entrepriseNewPdpCreation'
import {updateEntrepriseMutation} from '~/graphql/mutations/entreprise/updateEntrepriseMutation'

export default {

  components:{
    validation,
    entrepriseNewPdpCreation
  },

  props:{
    entreprise:{
      required: true,
      type: Object
    }
  },

  data() {
    return {
      editMode: false,
      openValidation:false,
      text: "Attention, si un plan de prévrention est en cours celui-ci va être archivé. Voulez-vous quand même créer un nouveau plan?",
      openForm: false,
      entrepriseDatas: {...this.entreprise}
    };
  },

  computed:{
    editBackGroundColor(){
      return this.editMode?"blue lighten-5":""
    },
  },

  methods: {
    cancel() {
      this.entrepriseDatas = {...this.entreprise}
      this.editMode = false;
    },

    async save() {
      try {
        await this.$api({
          data: updateEntrepriseMutation(this.entrepriseDatas)
        })
        this.editMode=false
      } catch (error) {
        console.log(error)
        this.cancel()
      }
    },

    activeForm(){
      this.openValidation = false
      this.openForm = true
    }
  },
};
</script>

<style>
</style>