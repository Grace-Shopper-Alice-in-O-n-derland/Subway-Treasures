const router = require('express').Router()
const {User, Order} = require('../db/models')
const isAdmin = require('./admin')
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

router.get('/allusers', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'fullName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
