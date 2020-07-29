export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      url:'http://localhost:1337/graphql',
      method: 'post',
      transformResponse: [(data)=>{
        const result = JSON.parse(data).data
        return result;
      }],
    })
  
  
    // Inject to context as $api
    inject('api', api)
  }
  