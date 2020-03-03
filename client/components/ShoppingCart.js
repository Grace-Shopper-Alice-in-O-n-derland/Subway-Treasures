import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
// import {getCart, addToCart, removeFromCart, deleteFromCart} from '../store'

const ShoppingCart = props => {
  const products = props.products

  return (
    <div>
      <h1>Cart will go here.</h1>
    </div>
  )
}

// const mapPropToCart = (state) => {
//   return {
// 	cart: state.cart,

//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
// }

export default ShoppingCart

// export default connect(mapPropToCart, mapDispatch)(ShoppingCart)
