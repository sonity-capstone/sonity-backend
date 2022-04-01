const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.editEmail = (req,res) => {
    User.findOne({
        where: {
          email: req.body.oldEmail
        }
      }).then(user => {
        user.update({email: req.body.newEmail})
        res.status(200).send("Hello")
      }) 
}
exports.editPassword = (req,res) => {
    User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
          if(bcrypt.compareSync(user.password, req.body.oldPassword)){
            let newPass = bcrypt.hashSync(req.body.newPassword, 8)
            user.update({password: newPass})
            res.status(200).send("Password")
          }
        
      }) 
}
exports.cancel = (req,res) => {
    User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        user.destroy()
        res.status(200).send("TOTAL ANNIHILATION")
      }) 
}



 