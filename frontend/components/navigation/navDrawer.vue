<template>
      <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-book-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Plans de prévention</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-factory</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Entreprises</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props:{
        drawer:{
            default:'false',
            type: Boolean
        }
    }

}
</script>

<style>

</style>