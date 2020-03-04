import axios from 'axios'
// import history from '../history'

/**
 * INITIAL STATE
 */

const initialState = {
  items: [],
  selectedItem: {}
}

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const GET_ITEM = 'GET_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})
const getItem = item => ({type: GET_ITEM, item})
const updateItem = item => ({type: UPDATE_ITEM, item})

/**
 * THUNK CREATORS
 */
export const fetchItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/items')
      dispatch(getItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchItem = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/items/${id}`)
      dispatch(getItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const decrementItemQuantity = (id, newQuantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/items/${id}`, {
        quantity: newQuantity
      })
      dispatch(updateItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.items
      }
    case GET_ITEM:
      return {
        ...state,
        selectedItem: action.item
      }
    case UPDATE_ITEM:
      return {
        ...state,
        selectedItem: action.item,
        items: [
          ...state.items.map(element => {
            if (element.id === action.item.id) {
              return action.item
            } else {
              return element
            }
          })
        ]
      }
    default:
      return state
  }
}
