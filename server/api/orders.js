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
      await order.setUser(req.user.id)
    }
    // Set order.hasItem(item) equal to a value so it can be awaited
    let testCase = await order.hasItem(item)
    // Then test whether testCase is truthy or falsey
    if (!testCase) {
      // If falsey, add the item to the order
      order.addItem(item, {
        through: {
          quantity: req.body.qty,
          price: req.body.price
        }
      })
    } else {
      // If truthy, this code should ideally update the existing item?
      // console.log(order.__proto__)

      /* I made an instance method (findItem) that will find an item(findItem), and I think you just have to update the quantity and price through the Fulfillments through table?? It might not actually be necessary to find the item, though. I think this change needs to be made in fulfillments, but not exactly sure how to access and update it. */

      let itemInOrder = await order.findItem(item)
      // Below code is actually changing the quantity of the item itself, which is referring to stock and not the cart
      itemInOrder.quantity += req.body.qty
      // await itemInOrder.save()
    }
    order.subTotal = order.subTotal + req.body.price
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
