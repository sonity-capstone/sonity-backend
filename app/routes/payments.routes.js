const { authJWT } = require("../middleware");
const controller = require("../controllers/payments.controller");

module.exports = function(app) {
  app.get("/payments/totalPaidByCustomer", controller.totalPaidByCustomer)
  app.post('/payments/addPayment', controller.addPayment)
};