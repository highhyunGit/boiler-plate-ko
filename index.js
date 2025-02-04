const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require("./config/key")

const { User } = require("./models/User");

//application/x-www-frorm-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json 
app.use(bodyParser.json());

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://hyun20ee:<chlgus9095>@boilerplate.bjyl4.mongodb.net/
// ',{})

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('Mongodb connect....'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~~~~~~~~')
})

app.post('/register', (req, res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다
    
    const user = new User(req.body)
    // 밑은 현재 몽고 디비에서는 지원안함
    // user.save((err, userInfo) => {
    //     if(err) return res.json({ success: false, err})
    //         return res.status(200).json({
    //         success: true        
    //     })
    // })
    user.save()
    .then(userInfo => res.status(200).json({ success: true }))
    .catch(err => res.json({ success: false, err }));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})