const ENV = require('../../env');
const knex = require('knex')({
  client: ENV.client,
  connection: {
      host: ENV.host,
      user: ENV.user,
      password: ENV.password,
      database: ENV.database,
      charset: 'utf8',
    },
});

module.exports = knex;