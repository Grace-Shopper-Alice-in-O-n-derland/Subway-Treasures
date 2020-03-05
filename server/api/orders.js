const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models/item')

/*
THESE ROUTES NEED TO BE BUILT OUT
*/

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    // qty, item id, order id
    console.log('LOOK HERE FOR ITEM ID!!!!!!!!!!!!!!!', req.body.id)
    console.log('IS THERE A USER???', req.user.id)
    console.log('ORDER QTY!!!!!!!!!!!!', req.body.qty)
    console.log('HERE IS MY PRICE!!!!!!!', req.body.price)
    const item = await Item.findByPk(req.body.id)
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      }
    })
    if (!order) {
      order = await Order.findOrCreate({
        where: {
          userId: req.user.id
        },
        include: [{model: Item}]
      })
    }
    order.addItem(item, {
      through: {
        quantity: req.body.qty,
        price: req.body.price
      }
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
