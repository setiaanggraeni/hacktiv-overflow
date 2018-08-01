const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const QuestionSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'Users'},
    thequestion: ''
})

const questions = mongoose.model('Questions', QuestionSchema)

module.exports = questions