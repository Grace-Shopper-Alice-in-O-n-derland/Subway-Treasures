const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models/item')
const Fulfillment = require('../db/models/fulfillment')

/*
THESE ROUTES NEED TO BE BUILT OUT
*/

router.get('/cart', async (req, res, next) => {
  try {
    console.log('IS THERE A USER', req.user.id)
    console.log('MAGIC METHODS', Object.keys(Order.prototype))
    const order = await Order.findAll({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    console.log(order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// //GET A SINGLE ITEM FROM THE CART BASED ON ID
// router.get('/cart/:id', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       },
//       include: [{model: Item}]
//     })
//     const item = await Fulfillment.findOne({
//       where: {
//         itemId: req.params.id,
//         orderId: order.id
//       }
//     })
//     res.json(item)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/cart', async (req, res, next) => {
  try {
    // qty, item id, order id
    const item = await Item.findByPk(req.body.id)
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      }
    })
    if (!order) {
      order = await Order.create({
        status: 'CREATED'
      })
      order.setUser(req.user.id)
      // order = await Order.create({
      //   where: {
      //     userId: req.user.id
      //   },
      //   include: [{model: Item}]
      // })
    }
    if (!order.hasItem(item)) {
      console.log('HI!!!!!!!!!!!!!!')
      order.addItem(item, {
        through: {
          quantity: req.body.qty,
          price: req.body.price
        }
      })
    } else {
      let itemInOrder = await order.getItems({
        item
      })
      console.log('!!!!!!!!!', itemInOrder)
      itemInOrder.quantity += req.body.qty
      await itemInOrder.save()
    }
    order.subTotal = order.subTotal + req.body.price
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
