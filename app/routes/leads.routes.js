const { Client } = require('pg');
const leadsDB = new Client();
const { authJWT } = require("../middleware");
leadsDB.connect();

const express = require('express');

const router = express();

router.get("/", [authJWT.verifyToken], (req, res) => {
    leadsDB.query(`
        SELECT * FROM li_data.get_profiles_list(235,34,285,20)
    `, (err, leads) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(leads.rows)
        }
    })
});
/*
router.get("/view", (req,res) => {

})
*/
module.exports = router