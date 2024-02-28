const knex = require('knex')({
  client: 'mysql2',
  connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'student_management',
      charset: 'utf8',
    },
});

module.exports = knex;