const mongoose = require('mongoose')

const mongoDB = process.env.MONGO_STRING || 'mongodb://localhost:27017/testDB'

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.Promise = global.Promise

module.exports = mongoose
