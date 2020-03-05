const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
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
