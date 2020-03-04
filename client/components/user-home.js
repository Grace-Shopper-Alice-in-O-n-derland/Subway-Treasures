import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DataTable from 'react-data-table-component'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, address, orders} = props
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
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Email: {email}</p>
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
