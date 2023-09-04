const mongoose = require('mongoose');
require('dotenv/config')
const databaseUri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.dqvytkn.mongodb.net/?retryWrites=true&w=majority`
const connectToMongo = () => {
    mongoose.connect(databaseUri).then(() => {
        console.log("Connected to Server Successfully...")
    })
}

module.exports = connectToMongo

// mongodb+srv://abhishek:abhishek123@ntb.etponjw.mongodb.net/test

// yabhi1205
// DqKv4YF28JxkHwUB