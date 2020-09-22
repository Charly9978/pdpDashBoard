export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      baseURL:'http://localhost:1337/graphql',
      method: 'post',
      transformResponse: [(data)=>{
        
        return data.data;
      }],
    })
  
  
    // Inject to context as $api
    inject('api', api)
  }
  