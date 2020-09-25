export default async function ({
  route,
  $auth,
  redirect,
  query
}) {

  console.log('route', route.path)


  if (route.path === '/logout') {
    return
  }



  if (route.path === '/connect/google/redirect') {

    console.log('token in route',query.access_token)
    const accesToken = query.access_token

    try {
      await $auth.login(accesToken)   
    } catch (error) {
      console.log('erreur from middle')
    }
  }



  if (route.path === '/login') {
    return $auth.connectToGoogle()
  }



  if (!$auth.isLogin) {
    return redirect('/login')
  }

}
