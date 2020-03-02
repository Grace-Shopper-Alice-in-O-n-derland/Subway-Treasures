const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// pre-made route
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const user = req.user
    if (!user) res.sendStatus(401)
    else res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })

    if (!user) {
      res.sendStatus(404)
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.delete('logout', (req, res, next) => {
  try {
    req.session.destroy()
    req.logout()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
