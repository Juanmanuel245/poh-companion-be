const { Schema, model } = require('mongoose');

const CodexSchema = Schema({
    title: {
        type: String, 
        require: true
    },
    author: {
        type: String, 
        require: true
    },
    link: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    meta: {
        type: String,
        require: true
    },
    visits: {
        type: Number,
        require: true,
        default: 0
    },
    positive_vote: {
        type: Number,
        require: true,
        default: 0
    },
    negative_vote: {
        type: Number,
        require: true,
        default: 0
    },
    
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = model('Codex', CodexSchema );