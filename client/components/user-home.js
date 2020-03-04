import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import SingleUserDisplay from './singleUserDisplay'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, administrator, firstName, lastName, address, orders} = props
  const columns = [
    {
      name: 'Order Number',
      selector: 'id'
    },
    {
      name: 'Date',
      selector: 'date'
    },
    {
      name: 'Total',
      selector: 'total'
    },
    {
      name: 'Status',
      selector: 'status'
    }
  ]

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <div>
        <h4>My Account</h4>
        {administrator ? (
          <div>
            <SingleUserDisplay
              email={email}
              firstName={firstName}
              lastName={lastName}
            />
            <Link to="/allusers">View All Users</Link>
          </div>
        ) : (
          <div>
            <SingleUserDisplay
              email={email}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
        )}
      </div>
      <DataTable title="Order History" columns={columns} data={orders} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    administrator: state.user.administrator,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    address: state.user.address,
    orders: state.user.orders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
