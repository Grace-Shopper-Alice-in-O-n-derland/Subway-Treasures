import React from 'react'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {decrementItemQuantity} from '../store/item'

class QtyDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Qty: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      Qty: event.target.value
    })
  }

  handleSubmit(item) {
    event.preventDefault()
    const newItemQty = item.quantity - this.state.Qty
    // this.props.addToCart(item, this.state.Qty)
    //for the addToCart method both the item we are adding and the quantity of that item to be added are parameters
    this.props.decrementItemQuantity(item.id, newItemQty)
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

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item)),
  decrementItemQuantity: (id, quantity) =>
    dispatch(decrementItemQuantity(id, quantity))
})

export default connect(null, mapDispatchToProps)(QtyDropDown)
