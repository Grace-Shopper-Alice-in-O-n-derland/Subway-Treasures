const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// remove (req.user.administrator) into its own callback function and place it in a separate file alongside a couple of other pieces of gatekeeping middleware to place in several different locations
// updating a product and adding a product should only belong to certain users

// if req.user exists, if req.user is self

function isAdmin(req, res, next) {
  if (req.user.administrator) next()
  else {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'fullName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
