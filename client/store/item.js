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

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items})
const getItem = item => ({type: GET_ITEM, item})

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

export const decrementItemQuantity = id => {
  return async dispatch => {
    //
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
    default:
      return state
  }
}
