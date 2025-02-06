const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require("./server/config/key");
const { auth } = require("./server/middleware/auth");

const { User } = require("./server/models/User");

//application/x-www-frorm-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://hyun20ee:<chlgus9095>@boilerplate.bjyl4.mongodb.net/
// ',{})

mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  }).then(() => console.log('Mongodb connect....'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~~~~~~~~')
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세용')
})

app.post('/api/users/register', (req, res) => {
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

app.post('/login', (req,res) => {

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    // User.findOne({ email: req.body.email }, (err, user) => {

    //     if (!user) {
    //       return res.json({
    //         loginSuccess: false,
    //         message: "제공된 이메일에 해당하는 유저가 없습니다."
    //       })
    //     }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                });
            }

            // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

                // 비밀번호까지 맞다면 토큰을 생성하기
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    // 토큰을 저장한다. 쿠키에 저장
                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userId: user._id });
                });
            });
        });
})

// Router <- Express에 나오는 것으로 정리 예정
// role 1 어드민 role 2 특정부서 어드민
// role 0 일반유저 role 1 관리자
app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해왔다는 얘기는 authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image


    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, 
        { token: ""}, { new: true})
        // (err, user) => {
        //     if(err) return res.json({ suceess: false, err});
        //     return res.status(200).send({
        //         success: true
        //     })
        // }
        .then(() => {
            res.status(200).send({ success:true })
          })
        .catch(err => {
            return res.json({ success: false, err});
        })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})