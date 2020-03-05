const Sequelize = require('sequelize')
const db = require('../db')

const Fulfillment = db.define('fulfillment', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Fulfillment
