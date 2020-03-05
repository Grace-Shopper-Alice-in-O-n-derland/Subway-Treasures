const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const User = db.model('user')

describe('The `User` model', () => {
  before(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    user = User.build({
      email: 'cody@gmail.com',
      password: '123',
      administrator: false,
      firstName: 'Cody',
      lastName: 'Pug',
      address: '111 Hanover Square'
    })
  })
  afterEach(() => {
    return Promise.all([User.truncate({cascade: true})])
  })

  describe('definition of User attributes', () => {
    it('includes `email`, `password`, `administrator`,`firstName`, `lastName`, `fullName`, `address`, `salt`, `googleId` fields', () => {
      return user.save().then(savedUser => {
        expect(savedUser.email).to.equal('cody@gmail.com')
        expect(savedUser.password).to.equal('123')
        expect(savedUser.administrator).to.equal(false)
        expect(savedUser.firstName).to.equal('Cody')
        expect(savedUser.lastName).to.equal('Pug')
        expect(savedUser.address).to.equal('111 Hanover Square')
      })
    })
  })
})
