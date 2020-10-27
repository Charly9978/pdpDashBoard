<template>
  <v-col cols="5">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <entrepriseDonneurOrdreSelect v-on:annuler="dialog=false"></entrepriseDonneurOrdreSelect>
    </v-dialog>
    <v-card>
      <v-card-title primary-title>
        Donneur d'ordre
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="$strapi.userIsAdmin">
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

  data() {
    return {
      dialog:false,
    };
  },

  computed:{
    id(){
      return this.$store.state.entreprise.entreprise.donneur_dordre.id
    },

    nom(){
      return this.$store.state.entreprise.entreprise.donneur_dordre.nom
    },

    prenom(){
      return this.$store.state.entreprise.entreprise.donneur_dordre.prenom
    },

    email(){
      return this.$store.state.entreprise.entreprise.donneur_dordre.email
    },

    service_soitec(){
      return this.$store.state.entreprise.entreprise.donneur_dordre.service_soitec.nomService
    }
  }
};
</script>

<style>
</style>