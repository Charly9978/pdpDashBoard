<template>
  <v-col cols="5">
    <v-card>
      <v-card-title primary-title>
        Donneur d'ordre
        <v-spacer></v-spacer>

        <v-btn v-if="!editMode" icon v-on:click="editMode = !editMode">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <div v-else>
            <v-btn icon v-on:click="test">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn icon v-on:click="test">
          <v-icon>mdi-cancel</v-icon>
        </v-btn>

        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="donneurOrdreComputed.nom"
          :readonly="!editMode"
          label="Nom"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="donneurOrdreComputed.prenom"
          :readonly="!editMode"
          label="Prénom"
          outlined
        ></v-text-field>
        <v-text-field
          type="email"
          v-model="donneurOrdreComputed.email"
          :readonly="!editMode"
          label="Adresse email"
          outlined
        ></v-text-field>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    donneurOrdre: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      editMode: false
    };
  },

  computed: {
    donneurOrdreComputed() {
      return { ...this.donneurOrdre };
    }
  }
};
</script>

<style>
</style>