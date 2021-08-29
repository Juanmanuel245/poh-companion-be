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
    
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = model('Codex', CodexSchema );