export default async ({store, app, redirect, error }, inject) => {
    
    class Auth{

        get user(){
            return store.state.auth.user
        }
        
        get isLogin(){
           return store.getters['auth/isLogin'] 
        }

        get isAdmin(){
          return store.getters['auth/isAdmin']
        }

        set user(user){
            store.commit('auth/SETUSER',user)
        }

        async fetchUser(){
            try {
                const resp = await app.$axios.get('http://localhost:1337/users/me',{withCredentials: true})
                console.log('resp',resp)
                this.user = resp.data
                console.log("connection ok")
            } catch (error) {
                console.log('problème de connection')
                redirect('/login')
            }
        }
    
        async login(accessToken){
            try {
              console.log('envoie requet auth/google/callback')
  
                const res = await app.$axios.get(`http://localhost:1337/auth/google/callback?access_token=${accessToken}`, {
                  withCredentials: true
                })
                console.log('res', res)
                this.user = res.data.user        
              } catch (e) {
                console.log('errorfromplugin', e)
                throw e
              }
    
        }
    
        connectToGoogle(){
          redirect("http://localhost:1337/connect/google")
        }
    
        async logout(){
            this.user = undefined
            await app.$axios.get('http://localhost:1337/logout',{withCredentials: true})
            redirect('/logout')
    
        }




    }

    const auth = new Auth()

   // await auth.fetchUser()
    
    inject('auth', auth)
  }
  