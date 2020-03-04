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
    // in general would prefer to not create with just req.body, and just take the necessary credentials you need from that object
    const item = await Item.create(req.body)
    res.json(item)
  } catch (error) {
    next(error)
  }
})

/*
http://expressjs.com/en/5x/api.html#router.param
router.param('id', async (req, res, next, id) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (item) {
      req.item = item;
      next();
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
      next(e)
    }
})
*/

router.get('/:id', async (req, res, next) => {
  // res.json(req.item)
  try {
    const item = await Item.findByPk(req.params.id)
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
