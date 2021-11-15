import PassportJWT from 'passport-jwt'
import User from '../model/User.model'

const cookieExtractor = (req) => {
  return req && req.cookie && req.cookie.token
}

const jwtOptions = {
  secretOrKey: 'secret',
  jwtFromRequest: PassportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new PassportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
})

exports.jwt = jwtStrategy
