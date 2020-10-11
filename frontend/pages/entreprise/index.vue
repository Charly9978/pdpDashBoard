<template>
  <v-container fluid>
    <validation
      :text="validationText"
      :openValidation="openValidation"
      @yes="openFormulaire"
      @no="openValidation = false"
    ></validation>
    <entrepriseFormCreation
      :openForm="openForm"
      @close="openForm = false"
      :entreprises="entreprises"
    ></entrepriseFormCreation>
    <v-row class="justify-center">
      <v-col cols="9">
        <div class="text-right">
          <v-btn color="primary" @click="openValidation = true"
            >Add a entreprise
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="9">
        <entrepriseCard
          v-for="entreprise in resultQuery"
          :key="entreprise.id"
          :entreprise="entreprise"
          @deleteEntreprise="deleteEntreprise"
        ></entrepriseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { entreprisesQuery } from "~/graphql/queries/entreprise/entreprisesQuery";
import entrepriseCard from "~/components/entreprise/entrepriseCard";
import entrepriseFormCreation from "~/components/entreprise/entrepriseFormCreation";
import validation from "~/components/utilities/Validation";

export default {
  components: {
    entrepriseCard,
    entrepriseFormCreation,
    validation,
  },

  async asyncData(context) {
    const resp = await context.$api.request({
      data: entreprisesQuery,
    });

    return {
      entreprises: resp.data.entreprises,
    };
  },

  data() {
    return {
      openForm: false,
      openValidation: false,
      validationText:
        "Avant de créer une nouvelle entreprise, vérifiez que celle-ci n'existe pas déjà. Utiliser la barre de recherche pour trouver l'entreprise. Etes-vous sur de vouloir créer une nouvelle entreprise?",
    };
  },

  computed: {
    searchQuery() {
      return this.$store.state.navbar.search;
    },

    resultQuery() {
      if (this.searchQuery) {
        return this.entreprises.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nom.toLowerCase().includes(v));
        });
      } else {
        return this.entreprises;
      }
    },
  },

  methods: {
    openFormulaire() {
      this.openValidation = false;
      this.openForm = true;
    },

    deleteEntreprise(id) {
        const index = this.entreprises.findIndex(entreprise => entreprise.id == id)
        this.entreprises.splice(index,1)
    }
  },
};
</script>

<style>
</style>