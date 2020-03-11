import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart, getLocalCart, sendOrderThunk} from '../store/cart'
const _ = require('lodash')

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      estado: '',
      zip: '',
      subTotal: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTotal = this.getTotal.bind(this)
  }

  componentDidMount() {
    this.props.getLocalCart()
    this.getTotal()
  }

  getTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let sum = 0
    cart.forEach(item => {
      sum += item.price
    })
    this.setState({
      subTotal: sum
    })
  }

  removeItem(item) {
    this.props.removeFromCart(item)
    this.getTotal()
    this.forceUpdate()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    const user = this.state
    const cart = this.props.cart
    const stringifiedUser = JSON.stringify(user)
    localStorage.setItem('user', stringifiedUser)
    this.props.sendOrderThunk(user, cart)
    this.props.history.push('/guestcheckout')
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="guest-cart-title">
        <h2>Here are your items:</h2>
        <div className="list">
          {cart && cart[0] ? (
            cart.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} />
                  <p>{item.name}</p>
                  <button onClick={() => this.removeItem(item)}>
                    Remove From Cart
                  </button>
                </div>
              )
            })
          ) : (
            <div>
              <p>Nothing in cart!</p>
            </div>
          )}
          <form action="/guestcheckout" onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />

            <label htmlFor="estado">State</label>
            <input
              type="text"
              name="estado"
              value={this.state.estado}
              onChange={this.handleChange}
            />

            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              name="zip"
              value={this.state.zip}
              onChange={this.handleChange}
            />
            <p>Total: ${this.state.subTotal} + Tax + Shipping</p>

            <button type="submit">Complete Order</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => {
  return {
    getLocalCart: () => dispatch(getLocalCart()),
    sendOrderThunk: (user, cart) => dispatch(sendOrderThunk(user, cart)),
    removeFromCart: item => dispatch(removeFromCart(item))
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
