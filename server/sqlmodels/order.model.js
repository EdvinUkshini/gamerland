module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
      userId: {
        type: Sequelize.STRING
      },
      shippingId: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
    });
  
    return Order;
  };