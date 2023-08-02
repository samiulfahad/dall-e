const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageDescription: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('post', postSchema)

module.exports = Post