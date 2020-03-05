const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('The `Order` model', () => {
  before(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    Order.build({
      status: 'CREATED',
      date: '2020-03-05',
      subTotal: 10,
      recipientName: 'Cody Pug',
      recipientAddress: '111 Hanover Square'
    })
  })
  afterEach(() => {
    return Promise.all([Order.truncate({cascade: true})])
  })

  describe('definition of Order attributes', () => {
    it('includes `status`, `date`, `subTotal`,`recipientName`, `recipientAddress` fields', () => {
      return Order.save().then(savedOrder => {
        expect(savedOrder.status).to.equal('CREATED')
        expect(savedOrder.date).to.equal('2020-03-05')
        expect(savedOrder.subTotal).to.equal(10)
        expect(savedOrder.recipientName).to.equal('Cody Pug')
        expect(savedOrder.recipientAddress).to.equal('111 Hanover Square')
      })
    })
  })
}) // end describe('Order model')
