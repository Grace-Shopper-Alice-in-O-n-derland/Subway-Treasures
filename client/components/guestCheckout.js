import React from 'react'
import {Link} from 'react-router-dom'

class GuestCheckout extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div>
        {!user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.address ||
        !user.city ||
        !user.estado ||
        !user.zip ? (
          <div>
            <p>Sorry, it looks like you didn't enter your info properly.</p>
            <Link to="/guestcart">Go Back!</Link>
          </div>
        ) : (
          <div>
            <h1>Thanks for your order!</h1>
            <p>Total: ${user.subTotal}</p>
            <p>Your items will be sent to:</p>
            <ul>
              <li>
                {user.firstName} {user.lastName}
              </li>
              <li>{user.address}</li>
              <li>{user.city}</li>
              <li>{user.estado}</li>
              <li>{user.zip}</li>
            </ul>
            <form action="/home">
              <button
                className="cart"
                onClick={() => localStorage.setItem('cart', '[]')}
              >
                Start New Order
              </button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default GuestCheckout
