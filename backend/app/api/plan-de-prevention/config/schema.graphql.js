module.exports = {
    query: `
      pdpsCount(where: JSON): Int!
    `,
    resolver: {
      Query: {
        pdpsCount: {
          description: 'Return the count of plan-de-preventions',
          resolverOf: 'application::plan-de-prevention.plan-de-prevention.count',
          resolver: async (obj, options, ctx) => {
              console.log("strapiApi",strapi.api['plan-de-prevention'].services)

            return await strapi.api["plan-de-prevention"].services["plan-de-prevention"].count(options.where || {});
          },
        },
      },
    },
  }