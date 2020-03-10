import React from 'react'
import {removeFromCart, removeCartItem, deleteFromCart} from '../store/cart'
import {connect} from 'react-redux'
import {decrementItemQuantity} from '../store/item'

class RemoveFromCart extends React.Component {
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
    const removeQty = item.quantity + this.props.itemQty - this.state.Qty
    const newCartQty = this.state.Qty
    const newCartPrice = item.price * this.state.Qty
    const itemId = item.id
    this.props.removeCartItem(itemId, newCartQty, newCartPrice)
    //for the addToCart method both the item we are adding and the quantity of that item to be added are parameters
    this.props.decrementItemQuantity(itemId, removeQty)
  }

  handleDelete(item) {
    const itemId = item.id
    const removeQty = item.quantity + this.props.itemQty
    this.props.deleteFromCart(itemId)
    this.props.decrementItemQuantity(itemId, removeQty)
  }

  render() {
    console.log('STATE', this.state)
    let itemQtyArr = []
    for (let i = 1; i <= this.props.itemQty; i++) {
      itemQtyArr.push(i)
    }
    return (
      <div>
        <form onSubmit={() => this.handleSubmit(this.props.currentItem)}>
          <label>
            Change Qty:
            <select value={this.state.value} onChange={this.handleChange}>
              {itemQtyArr.map(element => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="Change Qty" />
        </form>
        <button
          type="submit"
          onClick={() => this.handleDelete(this.props.currentItem)}
        >
          Remove from cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeFromCart: id => dispatch(removeFromCart(id)),
  decrementItemQuantity: (id, quantity) =>
    dispatch(decrementItemQuantity(id, quantity)),
  removeCartItem: (id, qty, price) => dispatch(removeCartItem(id, qty, price)),
  deleteFromCart: id => dispatch(deleteFromCart(id))
})

export default connect(null, mapDispatchToProps)(RemoveFromCart)
