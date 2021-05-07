module.exports = (sequelize, Sequelize) => {
    const Shipping = sequelize.define("ShippingAddress", {
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
    });
  
    return Shipping;
  };