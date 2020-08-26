<template>
  <v-row justify="center">
    <v-dialog max-width="350" v-model="openValidation">
      <v-card>
        <v-card-title class="headline">Demande de confirmation</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="$emit('yes')">Oui</v-btn>
          <v-btn color="success" @click="$emit('no')">Non</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    openValidation: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
</style>