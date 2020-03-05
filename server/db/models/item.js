const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      let value = this.getDataValue(price)
      return value / 100
    },
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Description to come but feel free to purchase!'
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
    //do we want to allow null or set a default image??
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  }
})

module.exports = Item
