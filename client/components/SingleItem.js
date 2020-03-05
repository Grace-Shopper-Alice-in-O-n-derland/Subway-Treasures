import React from 'react'
import {fetchItem, decrementItemQuantity} from '../store/item'
import {connect} from 'react-redux'
import NotFound from './NotFound'
import QtyDropDown from './QtyDropDown'

export class SingleItem extends React.Component {
  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
  }

  render() {
    // console.log('SINGLE ITEM PROPS', this.props)
    const item = this.props.items.selectedItem
    let quantityArr = []
    for (let i = 1; i <= item.quantity; i++) {
      quantityArr.push(i)
    }
    if (!item || item === 'undefined' || Object.keys(item).length === 0) {
      return (
        <div>
          <NotFound />
        </div>
      )
    } else {
      return (
        <div>
          <div className="single-item-view">
            <p>{item.name}</p>
            <img className="single-item-image" src={item.imageUrl} />
            <p>${item.price}</p>
            <p>{item.description}</p>
            <p>Available: {item.quantity}</p>
          </div>
          <div>
            <QtyDropDown quantityArr={quantityArr} currentItem={item} />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  items: state.item,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(fetchItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
