import React from 'react'
import {fetchItem} from '../store/item'
import {connect} from 'react-redux'
import NotFound from './NotFound'

export class SingleItem extends React.Component {
  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id)
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
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  items: state.item
})

const mapDispatchToProps = dispatch => ({
  fetchItem: id => dispatch(fetchItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
