<template>
  <v-col cols="5">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <entrepriseDonneurOrdreSelect v-on:annuler="dialog=false" v-on:return-donneur-ordre="changeDonneurDOrdre"></entrepriseDonneurOrdreSelect>
    </v-dialog>
    <v-card>
      <v-card-title primary-title>
        Donneur d'ordre
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" icon v-on:click="dialog=true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
          </template>
          <span>Modifier le donneur d'ordre de l'entreprise</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="nom"
          readonly
          label="Nom"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="prenom"
          readonly
          label="Prénom"
          outlined
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="email"
          readonly
          label="Adresse email"
          outlined
        ></v-text-field>
              <v-text-field
          v-model="service_soitec"
          readonly
          label="Service"
          outlined
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>

import entrepriseDonneurOrdreSelect from '~/components/entreprise/entrepriseDonneurOrdreSelect'
import {updateDonneurDOrdre} from '~/graphql/mutations/entreprise/updateDonneurDOrdre'

export default {
components:{
  entrepriseDonneurOrdreSelect
},

  props: {
    donneurOrdre: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dialog:false,
      id:this.donneurOrdre.id,
      nom: this.donneurOrdre.nom,
      prenom: this.donneurOrdre.prenom,
      email: this.donneurOrdre.email,
      service_soitec: this.donneurOrdre.service_soitec.nomService
    };
  },

  methods:{
    async changeDonneurDOrdre(donneurDOrdreId){
      const response = await this.$api.request({
        data:updateDonneurDOrdre({
          entrepriseId:this.$route.params.id,
          donneurDOrdreId
        })
      })
      const newDO = response.data.updateEntreprise.entreprise.donneur_dordre
      this.nom = newDO.nom
      this.prenom = newDO.prenom
      this.email = newDO.email
      this.service_soitec = newDO.service_soitec.nomService
      this.id = newDO.id
    }
  }
};
</script>

<style>
</style>