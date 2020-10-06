<template>
<v-dialog
  v-model="openForm"
  persistent
  max-width="850px"
  transition="dialog-transition"
>
  
  <v-col cols="12">
    <validation :text="textValidation" :openValidation="openValidation" @yes="sendData" @no="onNo"></validation>
  <v-card>
      <v-card-title primary-title>
          Création d'une nouvelle entreprise
      </v-card-title>
      <v-card-text>
          <v-row>
              <v-col cols=6>
                <v-text-field
                v-model="$v.nom.$model"
                label="Nom de l'entreprise"
                outlined
                clearable
                :error-messages="errorNom"
                ></v-text-field>
              </v-col>
              <v-col cols=6>
                <v-text-field
                v-model="$v.adresse.$model"
                label="Adresse de l'entreprise"
                outlined
                clearable
                :error-messages="errorAdresse"
                ></v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols=6>
                <v-text-field
                v-model="$v.principal_activity.$model"
                label="Activité principale"
                outlined
                clearable
                :error-messages="errorPrincipal_activity"
                ></v-text-field>
              </v-col>
              <v-col cols=6>
                <v-text-field
                v-model="$v.contact.$model"
                label="Email du contact principal"
                outlined
                clearable
                :error-messages="errorContact"
                ></v-text-field>
              </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="checkEntreprise">Enregistrer</v-btn>
          <v-btn color="primary" @click.stop="cancel">Annuler</v-btn>
      </v-card-actions>
  </v-card>
  </v-col>
</v-dialog>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";

import validation from '~/components/utilities/Validation'
import {createEntrepriseMutation} from '~/graphql/mutations/entreprise/createEntrepriseMutation'

export default {

  components:{
    validation
  },

    props:{
        openForm: {
            type: Boolean,
            required: true
        },
        entreprises: {
          type: Array,
          required: true
        }
    },

    data(){
        return{
            nom: "",
            adresse: "",
            principal_activity: "",
            contact: "",
            textValidation: "Cette entreprise semble déjà existée. Voulez vous quand même la créer?",
            openValidation: false
        }
    },

    computed:{
    errorNom() {
      const error = [];
      if (!this.$v.nom.required) error.push("Cette information est obligatoire");
      if(!this.$v.nom.maxLength) error.push("Vous avez dépasser le nombre maximal de lettres")
      return error;
    },
        errorAdresse() {
      const error = [];
      if (!this.$v.adresse.required) error.push("Cette information est obligatoire");
      if(!this.$v.adresse.maxLength) error.push("Vous avez dépasser le nombre maximal de lettres")
      return error;
    },
        errorContact() {
      const error = [];
      if (!this.$v.contact.required) error.push("Cette information est obligatoire");
      if(!this.$v.contact.email) error.push("Vous devez entrer une adresse email valide")
      return error;
    },
        errorPrincipal_activity() {
      const error = [];
      if(!this.$v.principal_activity.maxLength) error.push("Vous avez dépasser le nombre maximal de lettres")
      return error;
    },
      isEntrepriseAlreadyExist(){
        return this.entreprises.map(entreprise=>entreprise.nom.toLowerCase()).includes(this.nom.toLowerCase())
/*         const entreprises = this.entreprises.filter((entreprise)=>{
        return this.nom.toLowerCase().split(' ').every(v => entreprise.nom.toLowerCase().includes(v))
      })
      return entreprises.length>0?true:false */
      }

    },

    validations: {
        nom: {
            required,
            maxLength:25
        },
        adresse: {
            required,
            maxLength: 100
        },
        principal_activity: {
            maxLength:25            
        },
        contact: {
            required,
            email
        }
    },

    methods: {
        cancel(){
            this.nom= ""
            this.adresse= ""
            this.principal_activity= ""
            this.contact= ""
            this.$emit('close')
        },

        checkEntreprise(){
          if(this.isEntrepriseAlreadyExist){
            this.openValidation = true
          }else{
            this.sendData()
          }
          
        },

        onNo(){
          this.openValidation = false
          this.cancel()
        },

        async sendData(){
          this.openValidation = false
          console.log("envoie de la nouvelle data")
          const resp = await this.$api.request({
            data:createEntrepriseMutation({
              nom: this.nom,
              contact: this.contact,
              principal_activity: this.principal_activity,
              adresse: this.adresse
            })
          })
          this.cancel()
          console.log("res",resp)
          const newEntrepriseId = resp.data.createEntreprise.entreprise.id
          console.log('id',newEntrepriseId)
          this.$router.push(`/entreprise/${newEntrepriseId}`)
        }
    },



}
</script>

<style>

</style>