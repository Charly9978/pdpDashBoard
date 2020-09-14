<template>
  <v-app dark>
    <navBar></navBar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navBar from '~/components/navBar'

export default {
  components:{
    navBar
  }
}
</script>
