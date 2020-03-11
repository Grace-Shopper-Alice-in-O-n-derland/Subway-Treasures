const Sequelize = require('sequelize')
const db = require('../db')
const Fulfillment = require('./fulfillment')

const CREATED = 'CREATED'
const PROCESSING = 'PROCESSING'
const CANCELLED = 'CANCELLED'
const COMPLETED = 'COMPLETED'

const Order = db.define(
  'order',
  {
    status: {
      type: Sequelize.ENUM(CREATED, PROCESSING, CANCELLED, COMPLETED),
      defaultValue: CREATED,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW()
    },
    subTotal: {
      type: Sequelize.INTEGER,
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
    },
    orderItems: {
      type: Sequelize.ARRAY(Sequelize.JSON)
    }
  },
  {
    hooks: {
      beforeUpdate: async function(order) {
        if (order.status === 'PROCESSING') {
          let fulfillments = await Fulfillment.findAll({
            where: {
              orderId: order.id
            }
          })
          order.subTotal = fulfillments
            .map(fulfillment => fulfillment.itemPrice)
            .reduce((accum, price) => accum + price, 0)
        }
      }
    }
  }
)

Order.prototype.getDollars = function() {
  const dollarTotal = this.subTotal / 100
  this.subTotal = dollarTotal
}

module.exports = Order
