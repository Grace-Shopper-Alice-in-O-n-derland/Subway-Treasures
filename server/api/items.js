const router = require('express').Router()
const Item = require('../db/models/item')

// http://expressjs.com/en/5x/api.html#router.param
router.param('id', async (req, res, next, id) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item) {
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

router.put('/:id', async (req, res, next) => {
  try {
    await item.update(req.body.quantity)
    res.json(req.item)
  } catch (error) {
    next(error)
  }
})

module.exports = router
