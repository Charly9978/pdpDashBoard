import Vue from 'vue'

export default async function(context, inject){

    class Strapi {
        constructor(ctx){
            this.ctx = ctx
            this.strapiUrl = ctx.$config.strapi.url
            this.adminId = ctx.$config.strapi.adminId
            this.state = Vue.observable({ user: null })
            this.$http = ctx.$http.create({})
            this.$http.setBaseURL(this.strapiUrl)
            this.$http.onError((err) => {
                console.error(err)
            })
        }

        get user() {
            return this.state.user
          }
        
        get userIsAdmin() {
         return this.state.user.role.id === this.adminId ? true : false
        }

        get userIsLogin() {
            return this.state.user ? true : false
        }

        get userInitials(){
            if (this.state.user){
             const userName = this.state.user.username
             const userNameArray = userName.split('.')
             const firstLetter = userNameArray[0].charAt(0).toUpperCase()
             const lastLetter = userNameArray[1].charAt(0).toUpperCase()
             return firstLetter+lastLetter
             }else{
                 return null
             }
         }

        set user(user){
            Vue.set(this.state, 'user', user)
        }

        async fetchUser(){
            try {
                console.log("debut fetchUser")
                const resp = await this.$http.$get('/users/me')
                console.log('respfromstrapi',resp)
                this.user = resp.data
            } catch (error) {
                this.ctx.redirect('/login')
            }
        }

        connectToGoogle(){
            this.ctx.redirect(`${this.strapiUrl}/connect/google`)
          }

          async login(accessToken){
            try {
              console.log('envoie requet auth/google/callback')
  
                const res = await this.$http.$get(`/auth/google/callback?access_token=${accessToken}`)
                console.log('res', res)
                this.user = res.data.user        
              } catch (e) {
                console.log('errorfromplugin', e)
                throw e
              }
    
        }

        async logout(){
            this.user = null
            await this.$http.$get('/logout')
            this.ctx.redirect(`${this.strapiUrl}/logout`)
    
        }

        async graphQl(query){
            const { data } = await this.$http.$post(`/graphql`, query)
            return data
        }

    }

    const strapi = new Strapi(context)

    await strapi.fetchUser()

    inject('strapi', strapi)
}