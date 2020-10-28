module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '63244c55b867ec4ae6743149763f1fbe'),
    },
  },
  url:"http://localhost:1337",
  cron:{
    enabled: true
  },
  emitErrors:true
});
