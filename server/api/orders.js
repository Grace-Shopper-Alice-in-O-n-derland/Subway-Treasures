const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models/item')
const Fulfillment = require('../db/models/fulfillment')

/*
THESE ROUTES NEED TO BE BUILT OUT
*/

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findAll({
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

//GET A SINGLE ITEM FROM THE CART BASED ON ID
router.get('/cart/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    const item = await Fulfillment.findOne({
      where: {
        itemId: req.params.id,
        orderId: order.id
      }
    })
    res.json(item)
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
      order = await Order.create({
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
    const cartItem = await Fulfillment.findOne({
      where: {
        itemId: item.id,
        orderId: order.id
      }
    })
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
