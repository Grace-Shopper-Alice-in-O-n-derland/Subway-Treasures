const router = require('express').Router()
const Item = require('../db/models/item')
const isAdmin = require('./admin')

// http://expressjs.com/en/5x/api.html#router.param
router.param('id', async (req, res, next, id) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item) {
      item.getDollars()
      req.item = item
      next()
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      order: [['id', 'ASC']]
    })
    items.forEach(item => item.getDollars())
    //call the items in ascending order by Id # each time so they
    //don't get out of order with future state changes
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    res.json(req.item)
  } catch (error) {
    next(error)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     let item = req.item
//     await item.update(req.body)
//     res.json(req.item)
//   } catch (error) {
//     next(error)
//   }
// })

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

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
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
