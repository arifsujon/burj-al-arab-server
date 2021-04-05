const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
console.log(process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v0opz.mongodb.net/burjAlArab?retryWrites=true&w=majority`;

const port = 5000



const app = express()

app.use(cors());
app.use(bodyParser.json());

const pass = 'ArabianHorse79';



// const uri = "mongodb+srv://arabian:ArabianHorse79@GA7@cluster0.v0opz.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");

  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking)
    .then(result => {
      res.send(result.insertedCount > 0);
    })
    console.log(newBooking);
  })

  app.get('/bookings', (req, res) => {
    // console.log(req.query.email);
    bookings.find({email: req.query.email})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })
});


app.listen(port);