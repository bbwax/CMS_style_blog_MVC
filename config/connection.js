const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//     process.env.DB_DB,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'mysql'
//     },
// );
let sequelize;
if (process.env.DATABASE_URL) {
  console.log("SETTING DB USING URL", process.env.DATABASE_URL);
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}

module.exports = sequelize;