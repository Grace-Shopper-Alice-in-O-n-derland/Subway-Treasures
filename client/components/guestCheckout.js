import React from 'react'

export const GuestCheckout = props => {
  return (
    <div>
      <h1>Thanks for your order!</h1>
      <p>Total: $0</p>
      <p>Your items will be sent to:</p>
      <ul>
        <li>Name</li>
        <li>Address</li>
        <li>State</li>
        <li>City</li>
        <li>Zip</li>
      </ul>
    </div>
  )
}
