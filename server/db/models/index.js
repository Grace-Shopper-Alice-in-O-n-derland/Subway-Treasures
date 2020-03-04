const User = require('./user')
const Item = require('./item')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Item, {through: 'fulfillment'})
// const Fulfillment = db.define('fulfillment');
// Order.belongsToMany(Item, { through: Fullfillment });
/*
Fulfillment Table -> its own existing file
oId | itemId | quantity | price
1   | 1      |   3      | 23456
*/

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Item,
  Order
}
