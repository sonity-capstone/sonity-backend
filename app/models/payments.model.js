module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("payments", {
        userId: {
            type: Sequelize.INTEGER,
        },
        
        amount: {
          type: Sequelize.FLOAT,
        },
        stripeObjectId: {
          type: Sequelize.INTEGER,
        }
      
     
      
    });
  
    return Payments;
  };