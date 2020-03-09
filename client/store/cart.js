import axios from 'axios'

// let currentCart = {}
// if (localStorage.getItem('cart')) {
//   currentCart = JSON.parse(localStorage.getItem('cart'))
// } else {
//   currentCart = {}
// }

// initial state
const initialState = {
  cart: []
}

// action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// action creators
export const getCart = cart => ({type: GET_CART, cart})
export const addToCart = cart => ({type: ADD_TO_CART, cart})
export const removeFromCart = cartItem => ({type: REMOVE_FROM_CART, cartItem})
export const deleteItemFromCart = cartItem => ({
  type: DELETE_FROM_CART,
  cartItem
})

// thunk creators
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addCartItem = (id, qty, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders/cart', {
        id: id,
        qty: qty,
        price: price
      })
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeCartItem = (id, qty, price) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/orders/cart', {
        id: id,
        qty: qty,
        price: price
      })
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteFromCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/orders/cart/${id}`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const processCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/orders/cart/checkout', {
        id
      })
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// sub-reducer
export default function(state = initialState, action) {
  // let items
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}
