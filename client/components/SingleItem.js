import React from 'react'
import {fetchItem, decrementItemQuantity} from '../store/item'
import {connect} from 'react-redux'
import NotFound from './NotFound'
import {addToCart} from '../store/cart'

export class SingleItem extends React.Component {
  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  handleAddToCart(item) {
    this.props.addToCart(item)
    this.props.decrementItemQuantity(item)
  }

  render() {
    console.log('SINGLE ITEM PROPS', this.props)
    const item = this.props.items.selectedItem
    if (!item || item === 'undefined' || Object.keys(item).length === 0) {
      return (
        <div>
          <NotFound />
        </div>
      )
    } else {
      return (
        <div className="single-item-view">
          <p>{item.name}</p>
          <img className="single-item-image" src={item.imageUrl} />
          <p>${item.price}</p>
          <p>{item.description}</p>
          <button type="submit" onClick={() => this.addToCart(item)}>
            Add to cart
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  items: state.item
})

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(fetchItem(id)),
  addToCart: id => dispatch(addToCart(id)),
  decrementItemQuantity: id => dispatch(decrementItemQuantity(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
