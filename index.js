const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://hyun20ee:<chlgus9095>@boilerplate.bjyl4.mongodb.net/
// ',{})

mongoose.connect('mongodb+srv://hyun20ee:chlgus9095@boilerplate.bjyl4.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('Mongodb connect....'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})