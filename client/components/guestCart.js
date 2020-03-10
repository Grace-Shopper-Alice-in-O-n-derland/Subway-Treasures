import React from 'react'
import {connect} from 'react-redux'
import {getLocalCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {GuestCheckout} from './guestCheckout'

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
  }

  getTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let sum = this.state.subTotal
    cart.map(item => {
      sum += item.price
    })
    this.setState({
      subTotal: sum
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    const user = this.state
    const stringifiedUser = JSON.stringify(user)
    localStorage.setItem('user', stringifiedUser)
    console.log(localStorage)
    // how can I get GuestCheckout to render without giving it a new route?
    // return (
    //   <div>
    //     <GuestCheckout props={this.props} />
    //   </div>
    // )
    this.props.history.push('/guestcheckout')
  }

  render() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    return (
      <div>
        <h2>Here are your items:</h2>
        {cart.length > 0 ? (
          cart.map(item => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <p>{item.name}</p>
              </div>
            )
          })
        ) : (
          <div>
            <p>Something happened!</p>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
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

          <br />
          <br />

          <p>Subtotal: {this.state.subTotal}</p>

          <button type="submit">Guest Checkout</button>
          <p>PAYPAL BUTTON GOES HERE</p>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    getLocalCart: () => getLocalCart()
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
