export default async function ({app,route,redirect,query}) {
    console.log('outepath', route.path)
    if(route.path ==='/connect/google/redirect'){
        
        const acessToken = query.access_token
        console.log('token', acessToken)
        await app.$auth.login(acessToken)
        return redirect('/')
    }

    if(!app.$auth.isLogin){
        return redirect(app.$auth.connectToGoogle())
    }

    
}