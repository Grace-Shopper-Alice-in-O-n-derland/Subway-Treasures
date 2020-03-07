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
export const addToCart = cartItem => ({type: ADD_TO_CART, cartItem})
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
      dispatch(addToCart(data))
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
      dispatch(removeFromCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteFromCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/orders/cart/${id}`)
      dispatch(deleteItemFromCart(data))
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
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart.map(element => {
            if (element.id === action.cartItem.id) {
              return action.cartItem
            } else {
              return element
            }
          })
        ]
      }
    // items = state.cart
    // if (action.id in items) {
    //   items[action.id]++
    // } else {
    //   items[action.id] = 1
    // }
    // localStorage.setItem('cart', JSON.stringify(items))
    // history.push('/cart')
    // return items
    default:
      return state
  }
}
