import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    console.log('PROPS', this.props)
    const cart = this.props.cart.cart
    if (!cart || cart === 'undefined' || cart.length === 0) {
      return <p>No cart</p>
    } else {
      return (
        <div>
          {cart.map(element => (
            <div key={element.id}>
              <div>
                {element.items.map(item => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p>Quantity: {item.fulfillment.quantity}</p>
                    <p>Price: {item.fulfillment.price}</p>
                  </div>
                ))}
              </div>
              <p>subtotal:{element.subTotal}</p>
            </div>
          ))}
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
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)

//ORIGINAL BELOW
// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// // import thunks from store
// import {fetchCart} from '../store/cart'

// class Cart extends React.Component {
//   constructor() {
//     super()
//     this.handleClick = this.handleClick.bind(this)
//     // consider a handleChange?
//   }

//   componentDidMount() {
//     this.props.fetchCart()
//   }

//   handleClick() {
//     console.log('here is your cart', this.props.cart)
//     console.log('am I an array?', typeof this.props.cart)
//   }

//   handleClear() {
//     localStorage.clear()
//     console.log('cleared!')
//   }

//   render() {
//     return (
//       <div>
//         <h1>Cart will go here.</h1>
//         <button
//           type="submit"
//           onClick={() => {
//             this.handleClick()
//           }}
//         >
//           Click to View Cart
//         </button>
//         <br />
//         <br />
//         <button
//           type="submit"
//           onClick={() => {
//             this.handleClear()
//           }}
//         >
//           Click to Clear Cart
//         </button>
//       </div>
//     )
//   }
// }

// const mapState = state => ({
//   cart: state.cart
// })

// const mapDispatch = dispatch => {
//   return {
//     fetchCart: () => dispatch(fetchCart())
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)
