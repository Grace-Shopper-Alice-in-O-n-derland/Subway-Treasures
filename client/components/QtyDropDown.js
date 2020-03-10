import React from 'react'
import {addToCartThunk, addCartItem} from '../store/cart'
import {connect} from 'react-redux'
const _ = require('lodash')

class QtyDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Qty: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      Qty: Number(event.target.value)
    })
  }

  handleSubmit(item) {
    event.preventDefault()
    if (_.isEmpty(this.props.user)) {
      this.props.addToCartThunk(item)
      // Where should I be setting the local cart? I put it in the cart sub-reducer, when it was here it was only setting one item at a time.
      // setLocalCart(this.props.cart)
    } else {
      const userId = this.props.user.id
      const itemId = item.id
      const purchaseQty = this.state.Qty
      const itemPrice = item.price
      this.props.addCartItem(itemId, purchaseQty, itemPrice, userId)
      //for the addToCart method both the item we are adding and the quantity of that item to be added are parameters

      // this.props.decrementItemQuantity(itemId, newItemQty) //replacing this with a hook
    }
  }

  render() {
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    return (
      <form onSubmit={() => this.handleSubmit(this.props.currentItem)}>
        <label>
          Qty:
          <select value={this.state.value} onChange={this.handleChange}>
            {this.props.quantityArr.map(element => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Add to cart" />
      </form>
    )
  }
}

const mapState = state => ({
  user: state.user,
  items: state.item,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addToCartThunk: item => dispatch(addToCartThunk(item)),
  addCartItem: (id, qty, price, user) =>
    dispatch(addCartItem(id, qty, price, user))
})

export default connect(mapState, mapDispatchToProps)(QtyDropDown)
