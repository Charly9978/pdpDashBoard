module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url:"http://localhost:1337",
  cors:["http://localhost:3000","http://localhost:1337"],
  cron:{
    enabled: true
  },
  emitErrors:true
});
