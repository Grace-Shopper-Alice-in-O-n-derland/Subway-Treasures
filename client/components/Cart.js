import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, processCart} from '../store/cart'
import RemoveFromCart from './RemoveFromCart'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart.cart
    if (!cart || cart === 'undefined' || cart.length === 0) {
      return <p>No cart</p>
    } else {
      return (
        <div>
          <div>
            {cart.items.map(item => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>Quantity: {item.fulfillment.quantity}</p>
                <p>Price: {item.fulfillment.price}</p>
                <RemoveFromCart
                  itemQty={item.fulfillment.quantity}
                  itemPrice={item.fulfillment.price}
                  currentItem={item}
                />
              </div>
            ))}
          </div>
          <p>subtotal:{cart.subTotal}</p>
          <form action="/checkout">
            <button type="submit" onClick={this.props.processCart} order={cart}>
              Checkout
            </button>
          </form>
        </div>
      )
    }
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    processCart: () => dispatch(processCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
