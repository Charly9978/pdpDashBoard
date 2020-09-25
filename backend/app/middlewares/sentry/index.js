const Sentry = require('@sentry/node');
Sentry.init({
  dsn: "https://950f5e51542e4a16bed455712f67adf0@o439834.ingest.sentry.io/5407279",
  environment: strapi.config.environment,
});


module.exports = strapi => {
    return {
      initialize() {
        strapi.app.use(async (ctx, next) => {
          try {
            await next();
          } catch (error) {
            Sentry.captureException(error);
            throw error;
          }
        });
      },
    };
  };
  