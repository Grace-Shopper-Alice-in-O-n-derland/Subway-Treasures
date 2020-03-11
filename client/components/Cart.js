import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, processCart} from '../store/cart'
import RemoveFromCart from './RemoveFromCart'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.user.id)
  }

  render() {
    const cart = this.props.cart
    if (!cart || cart === 'undefined' || cart.length === 0) {
      return <p>No cart</p>
    } else {
      return (
        <div className="single-item-view">
          <div>
            {cart.items.map(item => (
              <div key={item.id}>
                <p>{item.name}</p>
                <img src={item.imageUrl} />
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
          <p className="subtotal">Subtotal:{cart.subTotal}</p>
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
  cart: state.cart.cart,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    fetchCart: id => dispatch(fetchCart(id)),
    processCart: () => dispatch(processCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
