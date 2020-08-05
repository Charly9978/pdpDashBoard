<template>
  <v-col cols="7">
    <v-card>
      <v-card-title primary-title>
        Entreprise
        <v-spacer></v-spacer>
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
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="entreprise.nom"
          label="Nom de l'entreprise"
          outlined
          :readonly="!editMode"
          :autofocus="editMode"
        ></v-text-field>
        <v-text-field
          v-model="entreprise.principal_activity"
          label="Activité principale"
          outlined
          hint="Pour les entreprises avec plusieurs activité. Ex: Applied polissage et Applied implant"
          persistent-hint
          :readonly="!editMode"
        ></v-text-field>
        <v-text-field
          v-model="entreprise.adresse"
          label="Adresse"
          outlined
          :readonly="!editMode"
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="entreprise.contact"
          label="Email du repésentant de l'entreprise"
          outlined
          :readonly="!editMode"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { updateEntrepriseMutation } from "@/graphql/mutations/entreprise/updateEntrepriseMutation";

export default {

  data() {
    return {
      editMode: false,
      entreprise:{
        id:this.$store.state.entreprise.entreprise.id,
        nom:this.$store.state.entreprise.entreprise.nom,
        adresse: this.$store.state.entreprise.entreprise.adresse,
        principal_activity: this.$store.state.entreprise.entreprise.principal_activity,
        contact: this.$store.state.entreprise.entreprise.contact
        } 
    };
  },

  methods: {
    cancel() {
      this.entreprise.id =this.$store.state.entreprise.entreprise.id,
        this.entreprise.nom =this.$store.state.entreprise.entreprise.nom,
        this.entreprise.adresse = this.$store.state.entreprise.entreprise.adresse,
        this.entreprise.principal_activity = this.$store.state.entreprise.entreprise.principal_activity,
        this.entreprise.contact = this.$store.state.entreprise.entreprise.contact;
      this.editMode = false;
    },

    async save() {
      this.$store.dispatch("entreprise/updateEntrepriseInfosById",this.entreprise)
      .then(()=>this.editMode=false)
      .catch((e)=>{
        console.log(e)
        this.cancel()
      })
    },
  },
};
</script>

<style>
</style>