import React from 'react'
import {addToCartThunk, addCartItem, setLocalCart} from '../store/cart'
import {connect} from 'react-redux'
import {decrementItemQuantity} from '../store/item'
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
      const purchaseQty = this.state.Qty
      const itemId = item.id
      const newItemQty = item.quantity - this.state.Qty
      const itemPrice = item.price * purchaseQty
      this.props.addCartItem(itemId, purchaseQty, itemPrice)
      this.props.decrementItemQuantity(itemId, newItemQty)
    }
  }

  render() {
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

const mapStateToProps = state => ({
  user: state.user,
  items: state.item,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addToCartThunk: item => dispatch(addToCartThunk(item)),
  decrementItemQuantity: (id, quantity) =>
    dispatch(decrementItemQuantity(id, quantity)),
  addCartItem: (id, qty, price) => dispatch(addCartItem(id, qty, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(QtyDropDown)
