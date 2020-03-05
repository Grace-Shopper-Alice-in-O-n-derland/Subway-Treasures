import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    // consider a handleChange?
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  // handleClick() {
  //   console.log('here is your cart', this.props.cart)
  //   console.log('am I an array?', typeof this.props.cart)
  // }

  handleClear() {
    localStorage.clear()
    console.log('cleared!')
  }

  render() {
    const cart = this.props.cart
    if (!items || items === 'undefined' || items.length === 0) {
      return <p>No Items</p>
    } else {
      return (
        <div className="all-items-on-homepage">
          {items.map(element => (
            <div key={element.id} className="indiv-item-on-homepage">
              <div className="indiv-item-info">
                <Link Link to={`/items/${element.id}`}>
                  {element.name}
                </Link>
                <img className="image-on-homepage" src={element.imageUrl} />
                <p>${element.price}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}

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

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
