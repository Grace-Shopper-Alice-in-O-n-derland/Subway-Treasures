'use strict'

const db = require('../server/db')
const {User, Item, Order} = require('../server/db/models')

// structure: {product: {Product}, quantity: X, price: X}
const orders = [
  {status: 'CREATED'},
  {status: 'PROCESSING'},
  {status: 'COMPLETED'},
  {status: 'COMPLETED'},
  {status: 'CANCELLED'}
]

const items = [
  {
    name: 'lost glove',
    price: 1000,
    description: 'a lost glove, lightly worn',
    quantity: 10,
    tags: ['Lost Items']
  },
  {
    name: 'metro card',
    price: 1000,
    description: 'a lost metro card, unknown value',
    imageUrl:
      'https://2.bp.blogspot.com/-jQO2z0Ni1d4/V0TMkH7KUlI/AAAAAAACku8/gsZ1KIPoLZEDngsdNPE4TNjam59IlJA_QCLcB/s1600/metrocard_395.jpg',
    quantity: 14,
    tags: ['Lost Items']
  },
  {
    name: 'ketchup packet',
    price: 1000,
    description: 'a heinz ketchup packet',
    quantity: 6,
    tags: ['Food']
  },
  {
    name: 'dollar bill',
    price: 1000,
    description: 'a dollar',
    quantity: 6,
    tags: ['Valuables', 'Lost Items']
  },
  {
    name: 'crumbled paper',
    price: 1000,
    description: 'paper',
    quantity: 4,
    tags: ['Trash']
  },
  {
    name: 'keys',
    price: 1000,
    description: 'lost keys',
    quantity: 9,
    tags: ['Lost Items']
  },
  {
    name: 'tin of altoids',
    price: 1000,
    description: 'half full',
    quantity: 10,
    tags: ['Food']
  },
  {
    name: 'receipt',
    price: 1000,
    description: 'a receipt dated March 5',
    quantity: 5,
    tags: ['Food']
  },
  {
    name: 'San Pellegrino bottle',
    price: 500,
    description: 'an empty San Pellegrino bottle (mini)',
    imageUrl:
      'https://archive.sltrib.com/images/2017/0401/wn_NYCsubway_040217~8.jpg',
    quantity: 50
  },
  {
    name: 'Snapple bottle (assorted)',
    price: 1500,
    description: `one of three flavors. seller's choice!`,
    imageUrl:
      'https://i.ibb.co/rHFJNLK/Screen-Shot-2020-03-09-at-4-03-36-PM.png',
    quantity: 10
  },
  {
    name: 'pet pigeon',
    price: 5000,
    description: 'New York-born pigeon',
    imageUrl: 'https://i.ytimg.com/vi/JRpQYIJPC0o/maxresdefault.jpg',
    quantity: 1000
  },
  {
    name: 'bigger pet pigeon',
    price: 7500,
    description: `only New York's finest`,
    imageUrl:
      'https://media.nbcnewyork.com/2019/09/pigeon-seth-meyer.jpg?fit=591%2C594',
    quantity: 500
  },
  {
    name: 'pole dancing rat',
    price: 25000,
    description: 'welcome to New York',
    imageUrl:
      'https://cdn.cms.prod.nypr.digital/images/052918rat1.2e16d0ba.fill-661x496.jpg',
    quantity: 1
  },
  {
    name: 'pet rat',
    price: 500,
    description: 'authentic NYC rat',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-842477204-1523996883.jpg',
    quantity: 1000
  },
  {
    name: 'single airpod',
    price: 15000,
    description: 'what do you need two for?',
    imageUrl:
      'https://images.macrumors.com/t/k3RMiWmMzdQXEqlMpABMn8Nq_II=/1600x0/article-new/2019/09/lost-airpods-nyc-subway.jpg',
    quantity: 100
  },
  {
    name: 'two metro cards',
    price: 1500,
    description: 'commentary not included',
    imageUrl:
      'https://i.dailymail.co.uk/i/pix/2014/02/21/article-0-1BB6139B00000578-598_634x841.jpg',
    quantity: 100
  },
  {
    name: 'stuffed animal',
    price: 5000,
    description: 'i really need a loving home',
    imageUrl: 'https://i.ytimg.com/vi/UczC5SMdw3k/maxresdefault.jpg',
    quantity: 1
  },
  {
    name: 'stack of metro cards',
    price: 5000,
    description: `swipe to see what you've won!`,
    imageUrl:
      'https://s3.amazonaws.com/bklyner/bklyner/wp-content/uploads/2012/12/metrocard.jpg',
    quantity: 10
  },
  {
    name: 'bloodstained metro card',
    price: 5000,
    description: `i've seen things`,
    imageUrl:
      'https://i.huffpost.com/gen/979684/images/o-BLOODY-METROCARD-facebook.jpg',
    quantity: 100
  },
  {
    name: '1995 metro card',
    price: 25000,
    description: `i'm a collectable!`,
    imageUrl: 'https://i.ebayimg.com/images/g/42AAAOSw4BNahgEN/s-l300.jpg',
    quantity: 1
  },
  {
    name: 'world pride metro card',
    price: 500,
    description: 'show your pride!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/d0/MTA_x_WorldPride_2019_-_48055830003.jpg',
    quantity: 250
  },
  {
    name: 'discarded purple umbrella',
    price: 2000,
    description: 'not just for rainy days',
    imageUrl:
      'https://media.gettyimages.com/photos/discarded-purple-umbrella-lies-on-the-ground-of-a-subway-entrance-on-picture-id1128242206',
    quantity: 500
  },
  {
    name: 'Roy Lichtenstein mural',
    price: 550000000,
    description: 'one-of-a-kind NYC treasure',
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/NsLPWKmmJ4_fokF_TlJgAU9jvQUMdPfvHlsahG0zXAWb_-7igjyTPzvAedJrMykQm8CqwXWh7Rvnf8p0CV791R7TXuQso7cR2o1quqn6u6RbhxtTmw',
    quantity: 1
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
    }),
    User.create({
      email: 'cobalt@email.com',
      password: '123',
      firstName: 'Cobalt',
      lastName: 'Meyer'
    }),
    User.create({
      email: 'cosmo@email.com',
      password: '123',
      firstName: 'Cosmo',
      lastName: 'Howell',
      administrator: true
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
