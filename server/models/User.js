const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenth: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        deault: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save', function( next ){
    var user = this;
    
    if(user.isModified('password')){
        
        // 비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567   암호화된pw $2b$10$2/3e.ftX02n0yzYAxRNo3ez22w571qs/QL.iMY4.zqapZTscd
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
            cb(null, isMatch);
    })
}

// userSchema.methods.generateToken = function(cb){
//     var user = this;
//     //jsonwebtoken을 이용해서 token 생성
//     var token = jwt.sign(user._id.toHexString(), 'secretToken')

//     // user._id+'secretToken' = token
//     user.token = token
//     user.save(function(err, user){
//         if(err) return cb(err)
//         cb(null, user)
//     })

// }
userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;

    user.save()
        .then(user => cb(null, user))
        .catch(err => cb(err));
}

// userSchema.statics.findByToken = function(token, cb) {
//     var user = this;
    
//     //토큰을 decode한다
//     jwt.verify(token, 'secretToken', function(err, decoded){
//     //유저 아이디를 이용해서 유저를 찾은 다음에
//     //클라이언트에서 가져온 token과 db에 보관된 토큰과 일치하는지 확인
//         user.findOne({ "_id": decoded, "token": token }, function (err, user) {
//             if(err) return cb(err);
//             cb(null, user)
//         })
//     })
// }
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    //토큰을 decode한다
    jwt.verify(token, 'secretToken', function(err, decoded){
        if(err) return cb(err);
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 db에 보관된 토큰과 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token })
            // .then(user => cb(null, user))
            .then(user => {
                // console.log("로그인된 유저 정보:", user);  // 여기서 user 값 찍어보기
                cb(null, user);  // user 값이 정상적으로 반환되는지 확인
            })
            .catch(err => cb(err));
        
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}