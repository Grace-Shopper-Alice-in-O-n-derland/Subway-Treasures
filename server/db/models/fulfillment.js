const Sequelize = require('sequelize')
const db = require('../db')
const Item = require('./item')

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
  },
  itemPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('price') * this.getDataValue('quantity')
    }
  },
  name: {
    type: Sequelize.STRING,
    get: async function() {
      let item = await Item.findByPk(this.itemId)
      return item.name
    }
  }
})

Fulfillment.prototype.getDollars = function() {
  const dollarPrice = this.price / 100
  this.price = dollarPrice
}

module.exports = Fulfillment
