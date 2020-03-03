import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store
import {fetchItems} from '../store/item'

// let myOrders = orders.map(order => {
//   if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
//     return order;
//   }
// })

class ShoppingCart extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const {items} = this.props.items
    console.log(items)
    return (
      <div>
        <h1>Cart will go here.</h1>
        <DataTable title="Arnold Movies" columns={columns} data={data} />
      </div>
    )
  }
}

const mapState = state => ({
  items: state.item
})

const mapDispatch = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems())
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
