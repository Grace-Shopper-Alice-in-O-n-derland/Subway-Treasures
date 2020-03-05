const router = require('express').Router()
const Order = require('../db/models/order')
const Item = require('../db/models')

/*
THESE ROUTES NEED TO BE BUILT OUT
*/

router.get('/cart', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'created'
      },
      include: [{model: Item}]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// router.post('/cart', async (req, res, next) => {
//   try {
//    const order = await Order.findOrCreate({
//      where: {
//        userId: req.user.id,
//        status: 'created'
//      },
//      include: [{model: Item}]
//     })
//   catch (error){
//      next(error)
//     })

// router.post()
