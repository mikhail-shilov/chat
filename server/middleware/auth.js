import passport from 'passport'

const handleJWT = (req, res, next, roles) => {
  return async (err, user, info) => {
    const error = err || info
    if (error || !user) {
      return res.status(401).json({ status: 401, ...err })
    }
    await req.logIn(user, { session: false })

    if (!roles.reduce((acc, rec) => acc && user.roles.some((t) => t === rec), true)) {
      return res.status(401).json({ status: 401, role: user.role, required: roles, ...err })
    }
    req.user = user

    return next()
  }
}

const auth =
  (roles = []) =>
  (req, res, next) => {
    return passport.authenticate(
      'jwt',
      {
        session: true
      },
      handleJWT(req, res, next, roles)
    )(req, res, next)
  }

export default auth
