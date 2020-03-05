const router = require('express').Router()
const {User} = require('../db/models')

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

router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'fullName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// As an administrator, I want to be able to have full rights to make back end requests to add, edit, and remove products. No one else should have access

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    res.json(item)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item) {
      await item.update(req.body)
      res.json(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    if (item) {
      res.send(item)
      await item.destroy()
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
