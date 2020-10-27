<template>
      <v-navigation-drawer
      v-if="$store.state.navbar.openDrawer"
      clipped
      app
      permanent
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
        <v-list-item link nuxt to='/entreprise'>
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

    methods:{
       toggleMenu(){
        this.$store.commit('navbar/SETOPENDRAWER')
        }
    }

}
</script>

<style>

</style>