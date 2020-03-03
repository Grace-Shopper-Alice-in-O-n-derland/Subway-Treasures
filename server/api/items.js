const router = require('express').Router()
const Item = require('../db/models/item')

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      order: [['id', 'ASC']]
    })
    //call the items in ascending order by Id # each time so they
    //don't get out of order with future state changes
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    res.json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    if (item) {
      res.json(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
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

router.delete('/:id', async (req, res, next) => {
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
