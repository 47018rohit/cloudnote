const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/rohit_cloudnotes"

const connectToMongo = () => {

  mongoose.connect(mongoURI, () => {
    console.log('connected to the mongo')
  })
}

module.exports = connectToMongo;