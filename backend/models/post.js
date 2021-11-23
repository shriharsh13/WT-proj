const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: { type: String, require:true },
    creator:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}
});

module.exports = mongoose.model('Post', postSchema); 