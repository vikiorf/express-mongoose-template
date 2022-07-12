import mongoose from 'mongoose'

const mongoDB = process.env.MONGO_STRING || 'mongodb://localhost:27017/sandbox-controller'

mongoose.connect(mongoDB, {}).then(() => {
  console.log('DB connected to ' + mongoDB)
})
mongoose.Promise = global.Promise

export default mongoose
