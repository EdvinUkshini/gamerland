module.exports = (sequelize, Sequelize) => {
    const Shipping = sequelize.define("shippingaddress", {
      userId: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        type: Sequelize.INTEGER
      },
    },{
      freezeTableName: true
    });
  
    return Shipping;
  };