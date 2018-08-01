const Question = require('../models/question')
const User = require('../models/user')
const Answer = require('../models/answer')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class AnswerController {
    static createAnswer(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({email: decoded.email}, (err, currentUser) => {
                    let id = currentUser[0].id
                    let {theAnswer} = req.body
                    let {thequestionId} = req.params._id
                    Answer.create({
                        userId:mongoose.Types.ObjectId(id),
                        theAnswer,
                        questionId:mongoose.Types.ObjectId(thequestionId) 
                    }, (err, createdAnswer) => {
                        if(err) return next('Wrong access!')
                        res.status(200).json(createdAnswer)
                    })
                }) 
            }) 
        }
    }

    static getAllAnswer(req, res){
        let token = req.headers.token
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else {
            Answer.find({})
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(403).json(err)
            })
        }
    }
}

module.exports = AnswerController