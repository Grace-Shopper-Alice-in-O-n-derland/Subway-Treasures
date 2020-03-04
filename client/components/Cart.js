import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
import {getCart, removeFromCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleClick() {
    console.log('here is your cart', this.props.cart)
    console.log('am I an array?', Array.isArray(this.props.cart))
  }

  handleClear() {
    localStorage.clear()
    console.log('cleared!')
  }

  render() {
    console.log(this.props)
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
        <br />
        <br />
        <button
          onClick={() => {
            this.handleClear()
          }}
        >
          Click to Clear Cart
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
