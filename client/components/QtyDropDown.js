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
    const userId = this.props.user.id
    const itemId = item.id
    const purchaseQty = this.state.Qty
    const itemPrice = item.price
    if (_.isEmpty(this.props.user)) {
      this.props.addToCartThunk(item, purchaseQty, itemPrice)
    } else {
      this.props.addCartItem(itemId, purchaseQty, itemPrice, userId)
    }
  }

  render() {
    return (
      <div className="single-item-view">
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
          {/* <input type="submit" value="Add to cart" /> */}
          <br />
          <button className="cart" type="submit">
            Add to cart
          </button>
        </form>
      </div>
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
