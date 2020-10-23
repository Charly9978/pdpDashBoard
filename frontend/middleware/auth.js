export default async function ({
  route,
  $auth,
  $strapi,
  redirect,
  query,
  error
}) {

  console.log('route', route.path)

  if (route.path === '/login') {
    return $strapi.connectToGoogle()
  }

  if (route.path === '/logout') {
    return
  }



  if (route.path === '/connect/google/redirect') {

    console.log('token in route',query.access_token)
    const accesToken = query.access_token

    try {
      await $strapi.login(accesToken)
      redirect('/')  
    } catch (e) {
      console.log(e.response)
      return error({
        statusCode:e.response.status,
        message: e.response.data.message
      })
    }
  }


  if (!$strapi.userIsLogin) {
    return redirect('/login')
  }

}
