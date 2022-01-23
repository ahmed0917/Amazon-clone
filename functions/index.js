const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KHwCDSAXF7IBgAw25R7I5nEP5kxu29Ag9Ai48tmePyj30VQg56QkQgLfdyaSRL753rzxcDBRygNU2JnMTKreXLj00Y0hRvlEr")


//API


//App Config
const app = express();


//Middleware
app.use(cors({origin:true}));
app.use(express.json());

//API Routes
app.get('/',(request,response) => response.status(200).send("Hello World!"))

app.post('/payments/create', async(request,response) => {
    const total = request.query.total;

    console.log("Payment request recieved for this amount ",total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount:total,
        currency:"usd"
    })

    //OK created
    response.status(201).send({
        clientsecret:paymentIntent.clientsecret
    })
})

//Listen Command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://localhost:5001/clone-a1afd/us-central1/api