<template>
  <v-btn color="success" @click="login">login</v-btn>
  
</template>

<script>
export default {
methods:{
    login(){
        this.$axios.get('http://localhost:1337/connect/google')
        .then(response=>console.log(response))
        .catch(e=>console.log(e))
    }
}
}
</script>

<style>

</style>