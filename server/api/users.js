const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.administrator) {
      const users = await User.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'fullName']
      })
      res.json(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/me', (req, res, next) => {
  try {
    const user = req.user
    if (!user) res.sendStatus(401)
    else res.json(user)
  } catch (error) {
    next(error)
  }
})

// router.post('/signup', async (req, res, next) => {
//   try {
//     const email = req.body.email
//     const password = req.body.password
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName
//     const address = req.body.address

//     const user = await User.create({
//       email,
//       password,
//       firstName,
//       lastName,
//       address
//     })

//     req.login(user, err => (err ? next(err) : res.json(user)))
//   } catch (error) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists')
//     } else {
//       next(error)
//     }
//   }
// })
