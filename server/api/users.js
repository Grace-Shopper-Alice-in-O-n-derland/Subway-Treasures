const router = require('express').Router()

const Order = require('../db/models/order')
const Item = require('../db/models/item')
const Fulfillment = require('../db/models/fulfillment')

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId)
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      }
    })
    await item.addOrder(order, {
      through: {
        quantity: req.body.qty
      }
    })
    //send the updated order back eager loaded with the items
    const updatedOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

//Going to incorporate the route below into the put route
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

router.delete('/:userId/cart/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId)
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      }
    })
    await order.removeItem(item)
    await order.save()
    const updatedOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart/:itemId', async (req, res, next) => {
  try {
    // qty, item id, order id
    const item = await Item.findByPk(req.params.itemId)
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      }
    })
    if (!order) {
      order = await Order.create({
        status: 'CREATED'
      })
      await order.setUser(req.params.userId)
    }
    // Grabbing the fulfillment from the database so we can update quantity
    let fulfillment = await Fulfillment.findOne({
      where: {
        itemId: item.id,
        orderId: order.id
      }
    })
    let orderItem = await order.hasItem(item)
    if (!orderItem) {
      order.addItem(item, {
        through: {
          quantity: Number(req.body.qty),
          price: req.body.price
        }
      })
    } else {
      fulfillment.quantity += Number(req.body.qty)
      await fulfillment.save()
    }
    //send back relevent order information for the cart
    const updatedOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CREATED'
      },
      include: [{model: Item}]
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/me', (req, res, next) => {
  try {
    const user = req.user
    if (!user) res.sendStatus(401)
    else res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
