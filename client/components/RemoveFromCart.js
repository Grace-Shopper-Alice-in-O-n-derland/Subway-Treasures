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
    const userId = this.props.user.id
    const newCartQty = this.state.Qty
    const itemId = item.id
    this.props.removeCartItem(itemId, userId, newCartQty)
    // const removeQty = item.quantity + this.props.itemQty - this.state.Qty
    // this.props.decrementItemQuantity(itemId, removeQty) //replacing this with hook
  }

  handleDelete(item) {
    const userId = this.props.user.id
    const itemId = item.id
    this.props.deleteFromCart(itemId, userId)
    // const removeQty = item.quantity + this.props.itemQty
    // this.props.decrementItemQuantity(itemId, removeQty) //replacing this with hook
  }

  render() {
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

const mapState = state => ({
  cart: state.cart.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  removeCartItem: (id, qty, price, user) =>
    dispatch(removeCartItem(id, qty, price, user)),
  deleteFromCart: (id, user) => dispatch(deleteFromCart(id, user))
})

export default connect(mapState, mapDispatchToProps)(RemoveFromCart)
