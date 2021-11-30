import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('connected', () => {
  console.log('Connected to DB')
})

mongoose.connection.on('error', (err) => {
  console.log("Can't connect to DB", err)
  process.exit(1)
})

exports.connect = async (mongoURL = config.mongoURL) => {
  await mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  return mongoose.connection
}
