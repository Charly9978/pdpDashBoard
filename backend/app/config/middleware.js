module.exports = {
  
    load: {
      before: ['sentry','cron'],
    },

    settings: {
        sentry: {
          enabled: true,
        },
         cors:{
          origin: ['http://localhost:3000', 'http://localhost:1337']
        } 
      }
  };