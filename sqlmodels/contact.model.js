module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return Contact;
  };