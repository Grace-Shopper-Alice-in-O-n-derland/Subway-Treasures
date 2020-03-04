import axios from 'axios'

// initial state

let currentCart
if (localStorage.getItem('cart')) {
  currentCart = JSON.parse(localStorage.getItem('cart'))
} else {
  currentCart = []
}

// cart is an array of objects
// keys:
//  id: integer
//  name: string
//  price: integer
//  description: quantity
//  quantity: integer

// action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// action creators
export const getCart = () => ({type: GET_CART})
export const addToCart = item => ({type: ADD_TO_CART, item})

// sub-reducer
export default function(state = currentCart, action) {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      localStorage.setItem('cart', JSON.stringify(action.item))
      // history.push('/cart')
      return action.item
    default:
      return state
  }
}
