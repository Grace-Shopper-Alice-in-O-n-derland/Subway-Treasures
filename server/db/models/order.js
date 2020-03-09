const Sequelize = require('sequelize')
const db = require('../db')

const CREATED = 'CREATED'
const PROCESSING = 'PROCESSING'
const CANCELLED = 'CANCELLED'
const COMPLETED = 'COMPLETED'

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(CREATED, PROCESSING, CANCELLED, COMPLETED),
    defaultValue: 'CREATED',
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW()
    //defaultValue: Sequelize.fn('now')
  },
  // items: {
  //   type: Sequelize.ARRAY(Sequelize.JSON)
  // },
  subTotal: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  recipientName: {
    type: Sequelize.STRING
  },
  recipientAddress: {
    type: Sequelize.STRING
  }
})

Order.prototype.getDollars = function() {
  const dollarTotal = this.subTotal / 100
  this.subTotal = dollarTotal
}

module.exports = Order
