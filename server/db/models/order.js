const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // creating constants for them so that you don't have to worry about typing the wrong string
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
  date: { // the date the order is processed -> be specifics bout what this date is representing
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  // subTotal: {

  // },
  recipientName: {
    type: Sequelize.STRING
  },
  // don't think this is fully necessary
  confirmationEmail: {
    type: Sequelize.STRING
  },
  recipientAddress: {
    type: Sequelize.STRING
  }
})

module.exports = Order

// may have a prototype method that gets total cost -> calculate that for you if you wanted to
