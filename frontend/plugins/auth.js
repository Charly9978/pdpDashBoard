export default async (context, inject) => {
    console.log('context',context.store)
    
    class Auth{

        get user(){
            return context.store.state.auth.user
        }
        
        get isLogin(){
           return context.store.getters['auth/isLogin'] 
        }

        set user(user){
            context.store.commit['auth/SETUSER'](user)
        }
        async fetchUser(){
            try {
                const resp = await context.app.$axios.get('http://localhost:1337/users/me',{withCredentials: true})
                this.user(resp.data)
                console.log("connection ok")
            } catch (error) {
                console.log('problème de connection')
                context.redirect('/login')
            }
        }
    
        login(accessToken){
    
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

    await auth.fetchUser()
    
    inject('auth', auth)
  }
  