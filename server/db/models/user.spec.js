/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    User.create({
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
      return User.save().then(savedUser => {
        expect(savedUser.email).to.equal('cody@gmail.com')
        expect(savedUser.password).to.equal('123')
        expect(savedUser.administrator).to.equal(false)
        expect(savedUser.firstName).to.equal('Cody')
        expect(savedUser.lastName).to.equal('Pug')
        expect(savedUser.address).to.equal('111 Hanover Square')
        expect(savedUser.fullName).to.equal(User.firstName, User.lastName)
      })
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
