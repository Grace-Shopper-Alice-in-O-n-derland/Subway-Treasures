import axios from 'axios'

let currentCart
if (localStorage.getItem('cart')) {
  currentCart = JSON.parse(localStorage.getItem('cart'))
} else {
  currentCart = []
}

// initial state
const initialState = {
  cart: currentCart
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
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_TO_CART:
      let items = state.cart
      // search state to find if the item is already in the cart
      let searchIdx = items.indexOf(action.item)
      if (searchIdx > -1) {
        items[searchIdx].quantity += 1
      } else {
        // edit the cart with new item, incrementing the quantity by 1
        action.item.quantity += 1
        items = [...state.cart, action.item]
      }
      localStorage.setItem('cart', JSON.stringify(items))
      // history.push('/cart')
      return items
    default:
      return state
  }
}
