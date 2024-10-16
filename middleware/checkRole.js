const checkRole = (role) => {
  return (req, res, next) => {
    const { payload } = res.locals // Assumes payload contains user info
    if (payload.role && payload.role === role) {
      return next() // User has the correct role
    }
    return res.status(403).send({ status: 'Error', msg: 'Access denied!' }) // Forbidden
  }
}

module.exports = checkRole
