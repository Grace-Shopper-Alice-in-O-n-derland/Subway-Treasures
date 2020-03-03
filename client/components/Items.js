import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export class Items extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const items = this.props.items.items
    console.log(items)
    if (!items || items === 'undefined' || items.length === 0) {
      return <p>No Items</p>
    } else {
      return (
        <div>
          {items.map(element => (
            <ul key={element.id}>
              <Link to={`/items/${element.id}`}>
                <li>{element.name}</li>
              </Link>
              <img src={element.imageUrl} />
              <li>{element.price}</li>
              <li>{element.description}</li>
            </ul>
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  items: state.item
  //double check this
})

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(fetchItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
