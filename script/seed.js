'use strict'

const db = require('../server/db')
const {User, Item, Order} = require('../server/db/models')

// structure: {product: {Product}, quantity: X, price: X}
const orders = [
  {status: 'CREATED'},
  {status: 'CREATED'},
  {status: 'PROCESSING'},
  {status: 'COMPLETED'},
  {status: 'COMPLETED'},
  {status: 'CANCELLED'}
]

const orders = [
  {status: 'CREATED', items: []},
  {status: 'CREATED', items: []},
  {status: 'COMPLETED', items: []},
  {status: 'CANCELLED', items: []},
  {status: 'PROCESSING', items: []}
]

const items = [
  {
    name: 'lost glove',
    price: 10.0,
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/7mhvMfGE2CLzrmzcFY972FEwpPzHaQuDqcIiDr9zOm5rGRyvfb3LUmpKjgq5FPs-U-ZgDCGYbl82HC-IihnspXBl7f_u-HRoewmUc_ThDHornq44Qm0VmJK5Sj9bvp9BB4RgyYs',
    description: 'a lost glove, lightly worn',
    quantity: 1,
    tags: ['Lost Items']
  },
  {
    name: 'metro card',
    price: 10.0,
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/7mhvMfGE2CLzrmzcFY972FEwpPzHaQuDqcIiDr9zOm5rGRyvfb3LUmpKjgq5FPs-U-ZgDCGYbl82HC-IihnspXBl7f_u-HRoewmUc_ThDHornq44Qm0VmJK5Sj9bvp9BB4RgyYs',
    description: 'a lost metro card, unknown value',
    quantity: 5,
    tags: ['Lost Items']
  },
  {
    name: 'ketchup packet',
    price: 10.0,
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/7mhvMfGE2CLzrmzcFY972FEwpPzHaQuDqcIiDr9zOm5rGRyvfb3LUmpKjgq5FPs-U-ZgDCGYbl82HC-IihnspXBl7f_u-HRoewmUc_ThDHornq44Qm0VmJK5Sj9bvp9BB4RgyYs',
    description: 'a heinz ketchup packet',
    quantity: 1,
    tags: ['Food']
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Fullstack',
      administrator: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Grace'
    })
  ])

  const seededItems = await Promise.all(
    items.map(item => {
      return Item.create(item)
    })
  )

  const seededOrders = await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  await seededOrders[0].addItem(seededItems[0])
  await seededOrders[0].addItem(seededItems[1])
  await seededOrders[0].addItem(seededItems[2])

  await seededOrders[0].setUser(users[0])
  await seededOrders[1].setUser(users[0])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${items.length} items`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
