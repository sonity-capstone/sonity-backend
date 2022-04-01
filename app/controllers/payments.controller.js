const db = require("../models");
const config = require("../config/auth.config");
const { payments: Payments } = db;

const Op = db.Sequelize.Op;

exports.totalPaidByCustomer = (req,res) => {
    Payments.sum('amount', {where: {userId: req.body.user_Id}}).then(payments => {
        res.json(payments)
        
    })
    
}
exports.addPayment = (req,res) => {
    Payments.create({
        userId: req.body.userId,
        amount: req.body.amount,
        stripeObjectId: req.body.stripeObjectId,
        
    
    }).then(payment => {
        res.status(200).json(payment)
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
        
      });
}
