const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB successfully");
    } 
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDB