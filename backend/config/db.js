// Database connection logic

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (err) {
        console.error(`MongoDB Connection Failed: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;