module.exports = (sequelize, Sequelize) => {
    const InterestList = sequelize.define("InterestLists", {
        user_Id: {
            type: Sequelize.INTEGER
        },
        leads: {
          type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
      
     
      
    });
  
    return InterestList;
  };