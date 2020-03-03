import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DataTable from 'react-data-table-component'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, address} = props
  const columns = [
    {
      name: 'Order Number',
      selector: 'orderNumber'
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
  const data = [
    {
      orderNumber: '123456',
      date: 'February 1, 2020',
      total: '$100',
      status: 'Completed'
    }
  ]

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <div>
        <h4 className="sc-fzoyAV jqBTNs">My Account</h4>
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Email: {email}</p>
      </div>
      <DataTable title="Order History" columns={columns} data={data} />
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
    address: state.user.address
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
