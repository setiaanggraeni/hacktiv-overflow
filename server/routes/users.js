var express = require('express');
var router = express.Router();
const {register, login} = require('../controllers/userController')
const {getAllQuestion, createQuestion, editQuestion, deleteQuestion} = require('../controllers/questionControllers')
const {createAnswer, getAllAnswer} = require('../controllers/answerController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', register)
router.post('/login', login)
router.post('/question', createQuestion)
router.get('/question', getAllQuestion)
router.put('/question/:_id', editQuestion)
router.delete('/question/:_id', deleteQuestion)
router.post('/answer/:_id', createAnswer)
router.get('/answer/', getAllAnswer)

module.exports = router;
