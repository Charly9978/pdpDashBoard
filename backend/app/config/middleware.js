module.exports = {
    load: {
      before: ['sentry','cron'],
    },

    settings: {
        sentry: {
          enabled: true,
        },
      }
  };