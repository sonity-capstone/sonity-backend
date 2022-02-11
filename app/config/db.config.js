module.exports = {
  HOST: process.env.APP_DB_HOST,
  PORT: process.env.APP_DB_PORT,
  USER: process.env.APP_DB_USER,
  PASSWORD: process.env.APP_DB_PASSWORD,
  DB: process.env.APP_DB_DATABASE,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};