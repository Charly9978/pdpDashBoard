<template>
      <v-app-bar
      app
      color="blue darken-3"
      clipped-left
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
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
        v-model="search"
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


computed:{

  initials(){
    return this.$strapi.userInitials
  },

  email(){
    return this.$strapi.userIsLogin?this.$strapi.user.email:null
  }
},

methods:{
  toggleMenu(){
    this.$store.commit('navbar/SETOPENDRAWER')
  },

  logout(){
    this.$strapi.logout()
  }
},

watch:{
  search:function(newValue){
    console.log('test', this.$store.commit)
    this.$store.commit('navbar/SETVALUE',newValue)
  }
}


}
</script>

<style>

</style>