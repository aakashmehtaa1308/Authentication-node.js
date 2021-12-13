const { Sequelize } = require('sequelize');
const app=require('./src/express')
const env = require('dotenv');
env.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mariadb'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  app.listen(process.env.PORT || '4000', (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`node server is listening on port 4000`);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}