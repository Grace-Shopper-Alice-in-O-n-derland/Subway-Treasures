const router = require('express').Router()
const Item = require('../db/models/item')

// http://expressjs.com/en/5x/api.html#router.param
router.param('id', async (req, res, next, id) => {
  try {
    // nice! can use the `id` variable here!
    const item = await Item.findByPk(req.params.id)
    if (item) {
      item.getDollars()
      req.item = item
      next()
    } else {
      // can call next with an error and 404
      res.sendStatus(404)
    }
  } catch (e) {
    next(e)
  }
})

router.get(
  '/',
  () => {},
  async (req, res, next) => {
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
  }
)

router.get('/:id', (req, res, next) => {
  // you don't need a try catch -> if/else
  // res.json(req.item)
  try {
    res.json(req.item)
  } catch (error) {
    next(error)
  }
})

// Be careful - are you actually protecting this route? want to add isAdmin here
// if you wanted to just change the quantity -> putting this into a lifecycle hook after your order/item through table has been saved (afterSave)
router.put('/:id', async (req, res, next) => {
  try {
    let item = req.item
    await item.update(req.body)
    res.json(req.item)
  } catch (error) {
    next(error)
  }
})

module.exports = router
