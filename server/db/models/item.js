const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
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
    // defaultValue: 'https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/181/2019/09/09091628/Image-Coming-Soon.png',
    validate: {
      isUrl: true
    }
    //do we want to allow null or set a default image??
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1000
    }
  }
})

Item.prototype.getDollars = function() {
  const dollarPrice = this.price / 100
  this.price = dollarPrice
}
// Item.setPurchaseQty = function(id){
//   const itemToPurchase =
// }

module.exports = Item
