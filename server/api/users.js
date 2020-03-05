const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/me', (req, res, next) => {
  try {
    const user = req.user
    if (!user) res.sendStatus(401)
    else res.json(user)
  } catch (error) {
    next(error)
  }
})
