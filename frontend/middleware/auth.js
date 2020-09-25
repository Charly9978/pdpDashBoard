export default async function ({
  route,
  $auth,
  redirect,
  query,
  error
}) {

  console.log('route', route.path)

  if (route.path === '/login') {
    return $auth.connectToGoogle()
  }

  if (route.path === '/logout') {
    return
  }



  if (route.path === '/connect/google/redirect') {

    console.log('token in route',query.access_token)
    const accesToken = query.access_token

    try {
      await $auth.login(accesToken)
      redirect('/')  
    } catch (e) {
      console.log(e.response)
      return error({
        statusCode:e.response.status,
        message: e.response.data.message
      })
    }
  }


  if (!$auth.isLogin) {
    return redirect('/login')
  }

}
