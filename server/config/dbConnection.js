const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DB connect.." , connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb