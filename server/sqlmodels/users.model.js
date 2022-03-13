module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.INTEGER
      },
      last_login: {
        type: Sequelize.DATE
      },
      registered: {
        type: Sequelize.DATE
      },
    },{
        freezeTableName: true
    });
  
    return Users;
  };