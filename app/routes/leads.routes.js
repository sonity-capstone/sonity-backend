const { Client } = require('pg');
const leadsDB = new Client();
const { authJWT } = require("../middleware");
leadsDB.connect();

const express = require('express');

const json2csv = require('json2csv');

const router = express();




router.get("/",  [authJWT.verifyToken], (req, res) => {
    let location_country_id = req.query.c_id ? req.query.c_id : 235
    let location_region_id  = req.query.r_id ? req.query.r_id : 34
    let location_metro_id   = req.query.m_id ? req.query.m_id : 285
    let industry_id         = req.query.i_id ? req.query.i_id : 20
    let limit               = req.query.limit ? req.query.limit : 10
    let offset               = req.query.offset ? req.query.offset : 0
    

    leadsDB.query(`
        SELECT * FROM li_data.get_profiles_list(
            ${location_country_id},
            ${location_region_id},
            ${location_metro_id},
            ${industry_id}
        ) LIMIT ${limit} OFFSET ${offset}
    `, (err, leads) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(leads.rows)
        }
    })
});



router.get("/csv", [authJWT.verifyToken], (req, res) => {
    
    let location_country_id = req.query.c_id ? req.query.c_id : 235
    let location_region_id  = req.query.r_id ? req.query.r_id : 34
    let location_metro_id   = req.query.m_id ? req.query.m_id : 285
    let industry_id         = req.query.i_id ? req.query.i_id : 20
    leadsDB.query(`
        SELECT * FROM li_data.get_profiles_list(
            ${location_country_id},
            ${location_region_id},
            ${location_metro_id},
            ${industry_id}
        )
    `, (err, leads) => {
        if (err) {
            res.send({error: err.toString()});
        } else {
            let leadsCsv = json2csv.parse(leads.rows, { fields: ['first_name', 'last_name', 'gender','linkedin_username']});
            res.setHeader('Content-disposition', 'attachment; filename=leads.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(leadsCsv);
        }
    })
});

router.get("/count",  (req, res) => {
    
    let location_country_id = req.query.c_id ? req.query.c_id : 235
    let location_region_id  = req.query.r_id ? req.query.r_id : 34
    let location_metro_id   = req.query.m_id ? req.query.m_id : 285
    let industry_id         = req.query.i_id ? req.query.i_id : 20
    leadsDB.query(`
        SELECT COUNT(*) FROM li_data.get_profiles_list(
            ${location_country_id},
            ${location_region_id},
            ${location_metro_id},
            ${industry_id}
        )
    `, (err, leads) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(leads.rows[0])
        }
    })
});

router.get("/countries",  (req, res) => {
    leadsDB.query(`
        SELECT * FROM reference.countries
    `, (err, countries) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            // res.send(countries.rows)
            res.send([
                {
                    "id": 39,
                    "linkedin_label": "Canada",
                    "alternate": "Canada",
                    "code_iso_2": "CA",
                    "code_iso_3": "CAN",
                    "code_numeric": "124",
                    "code_iso_3166_2": "ISO 3166-2:CA",
                    "un_region": "Americas",
                    "un_sub_region": "Northern America",
                    "un_intermediate_region": "",
                    "un_region_code": "019",
                    "un_sub_region_code": "021",
                    "un_intermediate_region_code": "",
                    "disolved": null
                },
                {
                    "id": 235,
                    "linkedin_label": "United States",
                    "alternate": "United States of America",
                    "code_iso_2": "US",
                    "code_iso_3": "USA",
                    "code_numeric": "840",
                    "code_iso_3166_2": "ISO 3166-2:US",
                    "un_region": "Americas",
                    "un_sub_region": "Northern America",
                    "un_intermediate_region": "",
                    "un_region_code": "019",
                    "un_sub_region_code": "021",
                    "un_intermediate_region_code": "",
                    "disolved": null
                }
            ])
        }
    })
});

router.get("/regions/:country_id",(req, res) => {
    leadsDB.query(`
        SELECT * FROM reference.na_regions WHERE country_id = ${req.params.country_id}
    `, (err, countries) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(countries.rows)
        }
    })
});

router.get("/metro_areas/:region_id",(req, res) => {
    leadsDB.query(`
        SELECT * FROM reference.na_metro_areas WHERE region_id = ${req.params.region_id}
    `, (err, countries) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(countries.rows)
        }
    })
});

router.get("/industries", (req, res) => {
    leadsDB.query(`
        SELECT * FROM reference.industries
    `, (err, countries) => {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send(countries.rows)
        }
    })
});

module.exports = router