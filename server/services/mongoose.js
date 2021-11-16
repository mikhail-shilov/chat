import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('connected', () => {
  console.log('Connected to DB')
})

mongoose.connection.on('error', (err) => {
  console.log("Can't connect to DB", err)
  process.exit(1)
})

/*
mongoose.connection.on('index', (err) => {
  if (err) {
    console.error('User index error: %s', err);
  } else {
    console.info('User indexing complete');
  }
})
*/

exports.connect = async (mongoURL = config.mongoURL) => {
  await mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  return mongoose.connection
}