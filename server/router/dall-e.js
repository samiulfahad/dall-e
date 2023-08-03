const express = require('express');
const router = new express.Router()
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// Routes
router.get("/", (req, res) => {
    res.send("Hello from Dall-E")
})

router.post('/generate', async (req, res, next) => {
    try {
        const { imageDescription } = req.body
        const response = await openai.createImage({
            prompt: imageDescription,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });
        const image = response.data.data[0].b64_json;
        res.status(200).json({image: image})
    }
    catch (err) {
        next(err)
    }
})


module.exports = router