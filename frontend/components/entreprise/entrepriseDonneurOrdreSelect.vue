<template>
  <div>
    <v-card>
      <v-card-text>
        <v-autocomplete
          v-model="donneurDOrdre"
          :items="donneurDOrdres"
          :item-text="item => item.prenom +' '+ item.nom"
          label="Donneur d'ordre"
          return-object
          outlined
          clearable
        ></v-autocomplete>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { donneurOrdresQuery } from "~/graphql/queries/entreprise/donneurOrdresQuery";

export default {
  data() {
    return {
      donneurDOrdres: [],
      donneurDOrdre: {},
    };
  },

  async created() {
    const response = await this.$api.request({
      data: donneurOrdresQuery,
    });
    this.donneurDOrdres = response.data.donneurDOrdres;
  },
};
</script>

<style>
</style>