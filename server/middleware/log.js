const log = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Log middleware.')
  next()
}

export default log
