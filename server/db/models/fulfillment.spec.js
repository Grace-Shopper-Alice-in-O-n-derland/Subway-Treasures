/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Fulfillment = db.model('fulfillment')

describe('Fulfillment model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    Fulfillment.build({
      quantity: 2,
      price: 100
    })
  })
  afterEach(() => {
    return Promise.all([Fulfillment.truncate({cascade: true})])
  })

  describe('definition of Fulfillment attributes', () => {
    it('includes `quantity`, `price` fields', () => {
      return Fulfillment.save().then(savedFill => {
        expect(savedFill.quantity).to.equal(2)
        expect(savedFill.price).to.equal(100)
      })
    })
  })
}) // end describe('Fulfillment model')
