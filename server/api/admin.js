function isAdmin(req, res, next) {
  if (req.user.administrator) next()
  else {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
}

module.exports = isAdmin
