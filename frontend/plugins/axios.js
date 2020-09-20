export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      baseURL:'http://localhost:1337/graphql',
      method: 'post',
      withCredentials: true,
      transformResponse: [(data)=>{
        const result = JSON.parse(data).data
        return result;
      }] 
    })
  
    // Inject to context as $api
    inject('api', api)
  }
  