export default async (context, inject) => {
    
    class Auth{

        get user(){
            return context.store.state.auth.user
        }
        
        get isLogin(){
           return context.store.getters['auth/isLogin'] 
        }

        set user(user){
            context.store.commit('auth/SETUSER',user)
        }

        async fetchUser(){
            try {
                const resp = await context.app.$axios.get('http://localhost:1337/users/me',{withCredentials: true})
                console.log('resp',resp)
                this.user = resp.data
                console.log("connection ok")
            } catch (error) {
                console.log('problème de connection')
                context.redirect('/login')
            }
        }
    
        async login(accessToken){
            try {
                const res = await $axios.get(`http://localhost:1337/auth/google/callback?access_token=${accessToken}`, {
                  withCredentials: true
                })
          
                await new Promise((resolve) => {
                  console.log('auth',$auth)
                  $auth.user = res.data.user
                  console.log('user', $auth.user)
          
                  resolve(redirect('/'))
                })
              } catch (e) {
                if (e.response && e.response.data.statusCode === 401) {
                  error({
                    statusCode: 401,
                    message: e.response.data.message
                  })
                } else {
                  error()
                }
              }
    
        }
    
        connectToGoogle(){
            context.redirect("http://localhost:1337/connect/google")
        }
    
        async logout(){
            this.user({})
            await context.app.$axios.get('http://localhost:1337/logout',{withCredentials: true})
            context.redirect('/logout')
    
        }




    }

    const auth = new Auth()

    console.log('pluginFetchUser')

    await auth.fetchUser()
    
    console.log('plugingBeforeInject')

    inject('auth', auth)
  }
  