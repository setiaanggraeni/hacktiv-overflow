const Question = require('../models/question')
const User = require('../models/user')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class QuestionController {
    static getAllQuestion(req, res){
        let token = req.headers.token
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else {
            Question.find({})
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(403).json(err)
            })
            // .populate('userId', 'userId._id') // member got from the transaction model which reference to Customers model
            // .exec(function(err, result){
            //     console.log('ini result ------',result);
            //     res.status(200).json(result)
            // })
        }
    }

    static readOneQuestion(req, res){
        let token = req.headers.token
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else {
            Question.findById({_id: req.params.id})
            .populate('userId', 'uesrId._id')
            .exec(function(err, result){
                res.status(200).json(result)
            })
        }
    } 

    static createQuestion(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                User.find({email: decoded.email}, (err, currentUser) => {
                    let id = currentUser[0].id
                    let {thequestion} = req.body
                    Question.create({userId:mongoose.Types.ObjectId(id), thequestion}, (err, createdQuestion) => {
                        if(err) return next('Wrong access!')
                        res.status(201).json('Successfully created new question!')
                    })
                }) 
            }) 
        }
    }

    static editQuestion(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                Question.find({_id : req.params._id}, (err, currentQuestion) => {
                    let idUser = currentQuestion[0].userId
                    let {thequestion} = req.body
                    if(decoded._id == idUser){
                        Question.update({_id : req.params._id}, {$set : {
                            thequestion
                        }})
                        .exec((err, result) => {
                            if(err) return next('Wrong access!')
                            res.status(201).json(`Successfully update question id ${req.params._id}`)
                        })
                    } else {
                        res.status(403).json('You dont have access to update this question!')
                    }
                })  
            })
        }
    }

    static deleteQuestion(req, res, next){
        let token = req.headers.token;
        if(!token){
            res.status(403).json('You have no access token, please login!')
        } else{
            jwt.verify(token, process.env.secretKey, (err,decoded)=>{
                Question.find({_id : req.params._id}, (err, currentQuestion) => {
                    let idUser = currentQuestion[0].userId
                    if(decoded._id == idUser){
                        Question.deleteOne({_id : req.params._id}, (err) => {
                            if(err) return next("Delete question failed!")
                            res.status(201).json(`Successfully deleted question id ${req.params._id}`)
                        })
                    } else {
                        res.status(403).json('You dont have access to delete this question!')
                    }
                })  
            })
        }
    }
}

module.exports = QuestionController