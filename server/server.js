const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const dalleRouter = require('./router/dall-e');
const postRouter = require('./router/post');
const connectDB = require('./utils/connectDB');

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use("/api/v1/dall-e", dalleRouter)
app.use("/api/v1/post", postRouter)


app.get("/", (req, res) => {
    res.send("Hello from express...........")
})


app.use((err, req, res, next) => {
    console.log(err);
    if (err.response && err.response.status) {
        if (err.response.status === 400) {
            return res.status(400).send({ success: false, message: "Sorry this requestt could not be completed", sCode: 400, data: err })
        }
        if (err.response.status === 401) {
            return res.status(400).send({ success: false, message: "BAD WORDS", sCode: 401, data: err })
        }
    } else {
        res.status(500).json({ success: false, errorDetails: err })
    }
})

const PORT = 3000
app.listen(PORT, async () => {
    await connectDB()
    console.log("Server is listening on port " + PORT);
})
