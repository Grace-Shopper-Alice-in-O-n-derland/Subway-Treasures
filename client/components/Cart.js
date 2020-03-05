import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
import {getCart, removeFromCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  handleClick() {
    console.log('here is your cart!', this.props.cart)
    console.log('am I an array?', Array.isArray(this.props.cart))
  }

  render() {
    return (
      <div>
        <h1>Cart will go here.</h1>
        <button
          onClick={() => {
            this.handleClick()
          }}
        >
          Click to View Cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
