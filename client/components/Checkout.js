import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  render() {
    const newOrder = this.props.user.orders.pop()
    return (
      <div>
        <p>Thank you for your order!</p>
        <p>Your total is ${newOrder.subTotal}!</p>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Checkout)
