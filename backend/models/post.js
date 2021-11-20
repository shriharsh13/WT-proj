const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: { type: String, require:true }
});

module.exports = mongoose.model('Post', postSchema); 