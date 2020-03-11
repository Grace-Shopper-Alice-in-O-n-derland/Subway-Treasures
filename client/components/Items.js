import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'

export class Items extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const items = this.props.items.items
    if (!items || items === 'undefined' || items.length === 0) {
      return <p>No Items</p>
    } else {
      return (
        <div className="all-items-on-homepage">
          {items.map(element => (
            <div key={element.id} className="indiv-item-on-homepage">
              <div className="indiv-item-info">
                <Link to={`/items/${element.id}`}>{element.name}</Link>
                {/* <img className="image-on-homepage" src={element.imageUrl} /> */}
                <p>${element.price}</p>
              </div>
            </div>
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
