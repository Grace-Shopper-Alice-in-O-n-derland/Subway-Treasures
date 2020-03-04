import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'
import SingleUserDisplay from './SingleUserDisplay'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const allUsers = this.props.allUsers

    return (
      <div>
        <h3>All Users</h3>
        {allUsers ? (
          allUsers.map(user => (
            <SingleUserDisplay
              key={user.id}
              email={user.email}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({allUsers: state.user.allUsers})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
