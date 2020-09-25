<template>
  <v-app dark>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Suivi des plans de prévention</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <span>{{error.message}}</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/">Connexion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
export default {
  layout:'simple',
  props: {
    error: {
      type: Object,
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
