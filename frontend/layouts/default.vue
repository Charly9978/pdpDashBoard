<template>
  <v-app dark>
    <navDrawer :drawer="drawer"></navDrawer>
    <navBar v-on:open-menu="openMenu"></navBar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navBar from '~/components/navigation/navBar'
import navDrawer from '~/components/navigation/navDrawer'

export default {
  components:{
    navBar,
    navDrawer
  },

  data(){
    return{
      drawer: false
    }
  },

  methods:{
    openMenu(payload){
      this.drawer = payload
    }
  }
}
</script>
