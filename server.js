const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const app = express();
const path = require('path')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  console.log('The db works very good :)');
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


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Stripe 
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1KjpsPKUN7pALEBlUZCJt0Hc',
        quantity: 15, 
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success.html`,
    cancel_url: `http://localhost:3000/cancel.html`,
  });

  res.redirect(303, session.url);
});
//Stripe Routes
app.use("/checkout", (req,res)=>{
  res.sendFile(path.join(__dirname, '/checkout.html'));
})


// default route
app.get("/", (req, res) => {
  res.json({ message: "This should be the home page" });
});
require('./app/routes/payments.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const leadsRouter = require('./app/routes/leads.routes')

app.use('/leads', leadsRouter);

// set port, listen for requests
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});