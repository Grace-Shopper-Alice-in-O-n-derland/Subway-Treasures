const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false
  },
  // items: {
  //   // structure: {product: {Product}, quantity: X, price: X}
  //   type: Sequelize.ARRAY(Sequelize.JSON),
  //   allowNull: false
  // },
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  // subTotal: {

  // },
  recipientName: {
    type: Sequelize.STRING
  },
  confirmationEmail: {
    type: Sequelize.STRING
  },
  recipientAddress: {
    type: Sequelize.STRING
  }
})

module.exports = Order
