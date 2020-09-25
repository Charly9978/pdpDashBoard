<template>
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
                <span>Vous n'êtes plus connecté à cette application. Cliquez sur le bouton de connexion pour accéder à l'application</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/">Connexion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {

  layout:'simple'

}
</script>

<style>

</style>