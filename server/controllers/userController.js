const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const saltRounds = 5;
var salt = bcrypt.genSaltSync(saltRounds);

class UserController {
    static register(req, res, next){
        var hash = bcrypt.hashSync(req.body.password, salt);
        var {name, email} = req.body
        var password = hash
        User.findOne({email:email})
        .then(user => {
            if(!user){
                User.create({name, email, password}, (err, newUser) => {
                    if(err) return next(err)
                    res.status(200).json(newUser)
                })
            } else {
                res.json('Email already registered!')
            }
        })
        
    }

    static login(req, res, next){
       var {email, password} = req.body
        User.findOne({email : email})
        .then(user =>{
            if(user !== null){
                let compare = bcrypt.compareSync(password, user.password)
                if(compare){
                    jwt.sign({_id:user._id, email:user.email}, process.env.secretKey, function(err, token){
                        res.status(200).json({name: user.name, token: token})
                    })
                } else{
                    res.json('Wrong email/password!')
                }
            } else {
                console.log('Email not found, please kindly for register!')
            }
            
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
    }
}

module.exports = UserController