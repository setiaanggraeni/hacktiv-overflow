const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const AnswerSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'Users'},
    questionId : {type: Schema.Types.ObjectId, ref: 'Questions'},
    theAnswer : String
})

const answers = mongoose.model('Answers', AnswerSchema)

module.exports = answers