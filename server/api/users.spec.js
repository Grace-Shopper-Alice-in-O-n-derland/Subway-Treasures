/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: '123',
        firstName: 'Cody',
        lastName: 'Fullstack'
      })
    })

    it('GET /api/users/me', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
