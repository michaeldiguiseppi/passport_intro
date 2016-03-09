module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/node_passport_local'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
