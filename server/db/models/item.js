const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://image.shutterstock.com/image-illustration/coming-soon-brand-new-product-260nw-223020478.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

// Item.setPurchaseQty = function(id){
//   const itemToPurchase =
// }

module.exports = Item
