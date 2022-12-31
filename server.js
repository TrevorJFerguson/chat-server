const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb')
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(express.json());

// mongoose cloud db setup here
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB connection OPEN!')
})
.catch(err => {
    console.log('major error alert: ', err)
})

// storing local db setup for later
// mongoose.set("strictQuery", false)
// mongoose.connect('mongodb://localhost:27017/messagesDb', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//     console.log('DB connection OPEN!')
// })
// .catch(err => {
//     console.log('major error alert: ', err)
// })

// put routers here, likely wont need them for such simple req handling
// but will make life easier if we add more functionality later
const messagesRouter = require('./server/routers/messages')


// any static assets will be served here though we shouldnt need any given the usage

// handle get req to messages and respond with all db data (all prior messages)
app.use('/messages', messagesRouter);

app.use('/messages', messagesRouter);

app.use('/', (req, res) => {
    res.status(200).send('no frontend, send json formatted body in get req to /messages')
})

// catch all reqs to bad routes
app.use((req, res) => {
    res.status(404).send('not routing correctly!! nothing found');
})




app.listen(PORT, () => {
    console.log(`listening on port: ${PORT} yeahhhhh`)
})

