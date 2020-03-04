import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
import {fetchItems} from '../store/item'
import {addToCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
    console.log('where are the items?', this.props)
  }

  // event.target? map that id to the item
  handleClick(item) {
    console.log('here is your item', item)
    this.props.addToCart(item)
    console.log('here is your cart', this.props.cart)
  }

  render() {
    return (
      <div>
        <h1>Cart will go here.</h1>
        <button
          onClick={() => {
            this.handleClick(this.props.items[0])
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  items: state.item.items,
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: item => dispatch(addToCart(item))
  }
}

export default connect(mapState, mapDispatch)(Cart)
