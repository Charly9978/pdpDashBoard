<template>
  <v-col cols="7">
    <v-card>
      <v-card-title primary-title>
        Entreprise
        <v-spacer></v-spacer>
        <v-btn v-if="!editMode" icon v-on:click="editMode = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <div v-else>
          <v-btn icon v-on:click="save">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon v-on:click="cancel">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="entrepriseDatas.nom"
          label="Nom de l'entreprise"
          outlined
          :readonly="!editMode"
          :autofocus="editMode"
        ></v-text-field>
        <v-text-field
          v-model="entrepriseDatas.nom"
          label="Activité principale"
          outlined
          hint="Pour les entreprises avec plusieurs activité. Ex: Applied polissage et Applied implant"
          persistent-hint
          :readonly="!editMode"
        ></v-text-field>
        <v-text-field
          v-model="entrepriseDatas.adresse"
          label="Adresse"
          outlined
          :readonly="!editMode"
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="entrepriseDatas.contact"
          label="Email du repésentant de l'entreprise"
          outlined
          :readonly="!editMode"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import {updateEntrepriseMutation} from '@/graphql/mutations/updateEntrepriseMutation'

export default {
  props: {
    entreprise: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      editMode: false,
      entrepriseDatas: {...this.entreprise}
    };
  },

  methods:{
      
      cancel(){
          this.entrepriseDatas = {...this.entreprise} 
          this.editMode = false
      },

      save(){
        this.$api.request({
          data: updateEntrepriseMutation({...this.entrepriseDatas})
        })
        .then(()=>{ 
          console.log("enregistrement réussi")
          this.editMode = false
          })
        .catch((e)=>{
          console.log(e)
          this.cancel()
          })
      }
  }
};
</script>

<style>
</style>