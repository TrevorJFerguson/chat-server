const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// put routers here, likely wont need them for such simple req handling
// but will make life easier if we add more functionality later
// const messagesRouter = require('router path here')


// any static assets will be served here though we shouldnt need any given the usage

// handle get req to messages and respond with all db data (all prior messages)
app.get('/messages',
    databaseController.getDatabase,
    (req, res) => res.status(200).json({ data: res.locals.database})
);

app.post('/messages',
    databaseController.postDatabase,
    (req, res) => res.status(200).send('message received')
)

app.get('/', (req, res) => {
    res.status(200).send('no front end, send json formatted body in get req to /messages')
})

// catch all reqs to bad routes
app.use((req, res) => {
    res.status(404).send('nothing found');
})




app.listen(PORT, () => {
    console.log(`listening on port: ${PORT} yeahhhhh`)
})

