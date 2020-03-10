import axios from 'axios'

// initial state
const initialState = {
  cart: []
}

// action types
const GET_CART = 'GET_CART'
const ADD_TO_LOCAL_CART = 'ADD_TO_LOCAL_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// action creators
export const getCart = cart => ({type: GET_CART, cart})
export const addToLocalCart = item => ({type: ADD_TO_LOCAL_CART, item})
export const removeFromCart = cartItem => ({type: REMOVE_FROM_CART, cartItem})
export const deleteItemFromCart = cartItem => ({
  type: DELETE_FROM_CART,
  cartItem
})

// thunk creators
export const getLocalCart = () => {
  return dispatch => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart) return undefined
    else dispatch(getCart(cart))
  }
}

export const setLocalCart = cart => {
  const stringifiedCart = JSON.stringify(cart)
  localStorage.setItem('cart', stringifiedCart)
}

export const addToCartThunk = item => {
  return dispatch => {
    dispatch(addToLocalCart(item))
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addCartItem = (itemId, qty, price, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/cart/${itemId}`, {
        qty: qty,
        price: price
      })
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeCartItem = (itemId, userId, qty) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/cart/${itemId}`, {
        qty: qty
      })
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteFromCart = (itemId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/users/${userId}/cart/${itemId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// export const processCart = id => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.put('/api/orders/cart/checkout', {
//         id
//       })
//       dispatch(getCart(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// sub-reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LOCAL_CART:
      // let id = action.item.id
      // items = state.localCart
      // if (id in items) {
      //   items[id]++
      // } else {
      //   items[id] = 1
      // }
      let obj = {
        ...state,
        cart: [...state.cart, action.item]
      }
      setLocalCart(obj.cart)
      return obj
    case GET_CART:
      setLocalCart(action.cart)
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}
