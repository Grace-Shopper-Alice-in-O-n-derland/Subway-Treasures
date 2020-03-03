import axios from 'axios'

// initial state

let myCart = localStorage.getItem('myCart')
myCart = JSON.parse(myCart)

if (myCart === null) {
  console.log('Cart is Empty')
} else {
  myCart.forEach(el => {
    console.log(el)
  })
}

let currentCart = []

// cart is an array of objects
// keys:
//  id: integer
//  product: object
//  quantity: integer

// action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// action creators
export const getCart = () => ({type: GET_CART})
export const addToCart = item => ({type: ADD_TO_CART, item})

// thunk creators

// sub-reducer
export default function(state = currentCart, action) {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      return {
        state,
        ...action.product
      }
    default:
      return state
  }
}
