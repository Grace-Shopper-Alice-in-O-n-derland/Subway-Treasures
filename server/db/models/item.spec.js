/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    Item.create({
      name: 'Left Hand Glove',
      price: 100,
      description: 'Left Hand Pink Glove',
      imageUrl: '',
      quantity: 1
    })
  })
  afterEach(() => {
    return Promise.all([Item.truncate({cascade: true})])
  })

  describe('definition of Item attributes', () => {
    it('includes `name`, `price`, `description`,`imageUrl`, `quantity` fields', () => {
      return Item.save().then(savedItem => {
        expect(savedItem.name).to.equal('Left Hand Glove')
        expect(savedItem.price).to.equal(100)
        expect(savedItem.description).to.equal('Patagonia Left Hand Pink Glove')
        expect(savedItem.imageUrl).to.equal('')
        expect(savedItem.quantity).to.equal(1)
      })
    })
  })
}) // end describe('Item model')
