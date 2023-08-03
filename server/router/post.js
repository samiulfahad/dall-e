const express = require('express');
const cloudinary = require('cloudinary').v2
const Post = require('../model/post');
const dotenv = require('dotenv');

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const router = new express.Router()

// Routes
router.get("/", (req, res) => {
    res.send("Hello from post")
})

// Get all the posts
router.get("/all", async (req, res, next) => {
    try {
        const posts = await Post.find({})
        res.status(200).json({ success: true, total: posts.length, posts })
    }
    catch (err) {
        next(err)
    }

})


// Add a new post
router.post('/add', async (req, res, next) => {
    try {
        const { name, imageDescription, image } = req.body
        const data = await cloudinary.uploader.upload(image)
        const newPost = await Post.create({ name, imageDescription, imageUrl: data.secure_url })
        res.status(201).json({ success: true, data: newPost })
    }
    catch (err) {
        next(err)
    }
})



module.exports = router