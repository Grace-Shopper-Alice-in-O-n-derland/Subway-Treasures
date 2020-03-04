const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    // Integers -> dealing in pennies
    // getter -> divide by 100
    // frontend work -> all of that in the frontend only
    // any MATH that happens happens with integers
    type: Sequelize.DECIMAL,
    allowNull: false
    // default value -> 0
    // minimum -> 0, don't want to pay your customers
  },
  description: {
    type: Sequelize.TEXT
    // default value to show your customers "No description here but please purchase this treasure!"
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://image.shutterstock.com/image-illustration/coming-soon-brand-new-product-260nw-223020478.jpg'
      // validation to check that this is a URL
  },
  quantity: {
    type: Sequelize.INTEGER
    // having validations against a minimum, maybe a range if you don't want to overstock
  },
  // to be its own table of tags you can select from and maybe having another many to many located here for easy filtering
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Item
