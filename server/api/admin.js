const router = require('express').Router()
const {User} = require('../db/models')

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
    const {name, price, description, imageUrl, quantity} = req.body

    let newItem = {name, price, admin: false}
    if (description) newItem.description = description
    if (imageUrl) newItem.imageUrl = imageUrl
    if (quantity) newItem.quantity = quantity

    const item = await Item.create(newItem)
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
