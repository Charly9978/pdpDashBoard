<template>
      <v-app-bar
      app
      color="blue darken-3"
      clipped-left
      dark
    >
      <v-app-bar-nav-icon @click.stop="openMenu"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Suivi des plans de prévention</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          size="32px"
          color="red lighten-2"
        >
          <span class="white--text">{{initials}}</span>
        </v-avatar>
      </template>
      <span>{{email}}</span>
    </v-tooltip>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
      <v-btn 
      icon
      v-on="on"
      v-bind="attrs"
      @click="logout">
        <v-icon>mdi-power</v-icon>
      </v-btn>
        </template>
        <span>Déconnexion</span>
    </v-tooltip>
    </v-app-bar>
</template>

<script>
export default {

data(){
    return {
        drawer: false,
//        initials: this.$store.getters['auth/initials'],
//        email: this.$store.state.auth.user.email
    }
},

computed:{

  initials(){
    return this.$store.getters['auth/initials']
  },

  email(){
    return this.$store.state.auth.user?this.$store.state.auth.user.email:null
  }
},

methods:{
  openMenu(){
    this.drawer=!this.drawer
    this.$emit('open-menu',this.drawer)
  },
  
  logout(){
    this.$auth.logout()
  }


}
}
</script>

<style>

</style>