const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Tag
