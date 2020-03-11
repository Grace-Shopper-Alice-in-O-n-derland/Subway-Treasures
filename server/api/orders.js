const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models/item')
const Fulfillment = require('../db/models/fulfillment')

router.post('/guestcart', async (req, res, next) => {
  try {
    const user = req.body.user
    const cart = req.body.cart
    let order = await Order.create({
      status: 'PROCESSING',
      subtotal: user.subTotal,
      recipientName: `${user.firstName} ${user.lastName}`,
      recipientAddress: `${user.address} ${user.city} ${user.estado} ${
        user.zip
      }`
    })
    const items = await Promise.all(
      cart.map(item => {
        return Item.findByPk(item.id)
      })
    )
    await items.forEach(item => {
      order.addItem(item, {
        through: {
          quantity: 1,
          price: item.price
        }
      })
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

// router.put('/cart', async (req, res, next) => {
//   try {
//     // qty, item id, order id
//     const item = await Item.findByPk(req.body.id)
//     let order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       }
//     })
//     // Grabbing the fulfillment from the database so we can update price and quantity
//     let fulfillment = await Fulfillment.findOne({
//       where: {
//         itemId: item.id,
//         orderId: order.id
//       }
//     })
//     fulfillment.quantity = Number(req.body.qty)
//     fulfillment.price = req.body.price
//     // Save the changes in the database
//     await fulfillment.save()
//     // Money in the backend is saved in pennies since javascript doesn't add decimals properly. The below instance method converts pennies to dollars for the frontend, but I don't think it's being sent properly, or there's something in the way it's rendered in the front end that doesn't display the dollar value properly
//     // fulfillment.getDollars()
//     order.subTotal = order.subTotal + req.body.price
//     await order.save()
//     //send the updated order back eager loaded with the items
//     const updatedOrder = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       },
//       include: [{model: Item}]
//     })
//     res.json(updatedOrder)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/cart/checkout', async (req, res, next) => {
//   try {
//     let order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       },
//       include: [{model: Item}]
//     })
//     order.status = 'PROCESSING'
//     await order.save()
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/cart/:id', async (req, res, next) => {
//   try {
//     // qty, item id, order id
//     const item = await Item.findByPk(req.params.id)
//     let order = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       }
//     })
//     await order.removeItem(item)
//     // Save the changes in the database
//     // Money in the backend is saved in pennies since javascript doesn't add decimals properly. The below instance method converts pennies to dollars for the frontend, but I don't think it's being sent properly, or there's something in the way it's rendered in the front end that doesn't display the dollar value properly
//     // fulfillment.getDollars()
//     await order.save()
//     const updatedOrder = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'CREATED'
//       },
//       include: [{model: Item}]
//     })
//     res.json(updatedOrder)
//   } catch (error) {
//     next(error)
//   }
// })
