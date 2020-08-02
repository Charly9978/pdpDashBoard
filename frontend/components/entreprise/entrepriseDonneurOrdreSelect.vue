<template>
    <v-card>
      <v-card-title primary-title>Selectionner un nouveau donneur d'ordre</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="11">
              <v-autocomplete
                v-model="donneurDOrdre"
                :items="donneurDOrdres"
                :item-text="item => item.prenom +' '+ item.nom"
                label="Donneur d'ordre"
                return-object
                outlined
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col v-if="donneurDOrdre" cols="1">
              <v-card-actions>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs" v-on:click="returnDonneurDOrdre(donneurDOrdre.id)">
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Enregistrer le nouveau donneur d'ordres</span>
                </v-tooltip>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
        <v-row no-gutters>
          <v-col cols=5>
            <v-divider class="mt-4"></v-divider>
          </v-col>
          <v-col cols=2 class="text-center text-h5" >
            OU
          </v-col>
          <v-col cols=5>
            <v-divider class="mt-4"></v-divider>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title primary-title>Créer un nouveau donneur d'ordre</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="nom" label="Nom" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="prenom" label="Prenom" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="email" label="Email" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="service_soitec"
                :items="services"
                item-text="nomService"
                item-value="id"
                label="Service du donneur d'ordre"
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-card-actions v-if="!$v.$invalid">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs" v-on:click="create">
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </template>
                  <span>Enregistrer le nouveau donneur d'ordres</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" icon text v-on:click="cancel">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Annuler les modifications</span>
                </v-tooltip>
              </v-card-actions>
            </v-col>
          </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="annuler" color="info">Annuler</v-btn>
      </v-card-actions>
        </v-container>
      </v-card-text>
    </v-card>
</template>

<script>
import { donneurOrdresQuery } from "~/graphql/queries/entreprise/donneurOrdresQuery";
import {createDonneurDOrdre} from '~/graphql/mutations/entreprise/createDonneurDOrdre'
import { required, email } from "vuelidate/lib/validators";

export default {

  data() {
    return {
      donneurDOrdres: [],
      donneurDOrdre: undefined,
      services: [],
      nom: "",
      prenom: "",
      email: "",
      service_soitec: "",
    };
  },

  validations: {
    nom: {
      required,
    },
    prenom: {
      required,
    },
    email: {
      required,
      email,
    },
    service_soitec: {
      required,
    },
  },

  async created() {
    const response = await this.$api.request({
      data: donneurOrdresQuery,
    });
    this.donneurDOrdres = response.data.donneurDOrdres;
    this.services = response.data.serviceSoitecs;
  },

  methods: {
    async create(){
      const newDonneurDOrdreResponse = await this.$api.request({
        data: createDonneurDOrdre({
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          service_soitec: this.service_soitec
        })
      })
      const donneurDOrdreId = newDonneurDOrdreResponse.data.createDonneurDOrdre.donneurDOrdre.id
      this.returnDonneurDOrdre(donneurDOrdreId)


    },

    returnDonneurDOrdre(donneurDOrdreId) {
      this.$emit('return-donneur-ordre',donneurDOrdreId)
      this.annuler()

    },
    cancel() {
      this.nom=""
      this.prenom=""
      this.email=""
      this.service_soitec=""
    },
    annuler(){
      this.cancel()
      this.donneurDOrdre = undefined
      this.$emit('annuler')
    }
  },
};
</script>

<style>
</style>