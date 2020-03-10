import React from 'react'

export const GuestCheckout = props => {
  return (
    <div>
      <h1>Thanks for your order!</h1>
      <p>Total: ${this.props.subTotal}</p>
      <p>Your items will be sent to:</p>
      <ul>
        <li>{this.props.name}</li>
        <li>{this.props.address}</li>
        <li>{this.props.city}</li>
        <li>{this.props.estado}</li>
        <li>{this.props.zip}</li>
      </ul>
    </div>
  )
}
