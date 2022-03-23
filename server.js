const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const app = express();

dotenv.config()

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  //initial();
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
 
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

var corsOptions = {
  origin: "http://localhost:3050"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// default route
app.get("/", (req, res) => {
  res.json({ message: "This should be the home page" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const leadsRouter = require('./app/routes/leads.routes')

app.use('/leads', leadsRouter);

// set port, listen for requests
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});