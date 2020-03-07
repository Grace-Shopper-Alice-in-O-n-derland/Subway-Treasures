const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models/item')
const Fulfillment = require('../db/models/fulfillment')

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

router.put('/cart', async (req, res, next) => {
  try {
    // qty, item id, order id
    const item = await Item.findByPk(req.body.id)
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      }
    })
    // Grabbing the fulfillment from the database so we can update price and quantity
    let fulfillment = await Fulfillment.findOne({
      where: {
        itemId: item.id,
        orderId: order.id
      }
    })
    fulfillment.quantity = Number(req.body.qty)
    fulfillment.price = req.body.price
    // Save the changes in the database
    await fulfillment.save()
    // Money in the backend is saved in pennies since javascript doesn't add decimals properly. The below instance method converts pennies to dollars for the frontend, but I don't think it's being sent properly, or there's something in the way it's rendered in the front end that doesn't display the dollar value properly
    // fulfillment.getDollars()
    order.subTotal = order.subTotal + req.body.price
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart/:id', async (req, res, next) => {
  try {
    // qty, item id, order id
    const item = await Item.findByPk(req.params.id)
    let order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'CREATED'
      }
    })
    await order.removeItem(item)
    // Save the changes in the database
    // Money in the backend is saved in pennies since javascript doesn't add decimals properly. The below instance method converts pennies to dollars for the frontend, but I don't think it's being sent properly, or there's something in the way it's rendered in the front end that doesn't display the dollar value properly
    // fulfillment.getDollars()
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

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
    // Grabbing the fulfillment from the database so we can update price and quantity
    let fulfillment = await Fulfillment.findOne({
      where: {
        itemId: item.id,
        orderId: order.id
      }
    })
    // Set order.hasItem(item) equal to a value so it can be awaited
    let orderItem = await order.hasItem(item)
    // Then test whether orderItem is truthy or falsey
    if (!orderItem) {
      // If falsey, add the item to the order
      order.addItem(item, {
        through: {
          quantity: Number(req.body.qty),
          price: req.body.price
        }
      })
    } else {
      // If truthy, update the price and quantity of the items
      fulfillment.quantity += Number(req.body.qty)
      fulfillment.price += req.body.price
      // Save the changes in the database
      await fulfillment.save()
      // Money in the backend is saved in pennies since javascript doesn't add decimals properly. The below instance method converts pennies to dollars for the frontend, but I don't think it's being sent properly, or there's something in the way it's rendered in the front end that doesn't display the dollar value properly
      // fulfillment.getDollars()
    }
    order.subTotal = order.subTotal + req.body.price
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
