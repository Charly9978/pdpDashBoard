export default async function ({
  route,
  $auth,
  redirect,
  query
}) {


  if (route.path === '/logout') {
    return
  }



  if (route.path === '/connect/google/redirect') {

    const accesToken = query.access_token

    try {
      $auth.login(accesToken)   
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
