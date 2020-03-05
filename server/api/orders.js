const router = require('express').Router()
const Order = require('../db/models/order')

/*
THESE ROUTES NEED TO BE BUILT OUT
*/

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
