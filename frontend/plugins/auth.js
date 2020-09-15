export default (context, inject) => {
    class Auth{
        constructor(){

        }
    }

    const auth = new Auth()
    inject('auth', auth)
  }
  