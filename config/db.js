const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology : true
        });

        console.log(`mongo db connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`error : ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;