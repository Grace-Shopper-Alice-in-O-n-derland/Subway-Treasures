const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const Fulfillment = require('./fulfillment')
const Tag = require('./tag')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Item, {through: 'fulfillment'})
Item.belongsToMany(Order, {through: 'fulfillment'})
Item.belongsToMany(Tag, {through: 'Item_Tags'})
Tag.belongsToMany(Item, {through: 'Item_Tags'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Item,
  Order,
  Fulfillment
}
