const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    logging: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.interestList = require("../models/interestList.model")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
})
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
})
db.user.hasOne(db.interestList, {
  foreignKey: 'user_Id', targetKey: 'id'
})


db.ROLES = ["user", "admin"];

module.exports = db;