import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/admin'
import SingleUserDisplay from './SingleUserDisplay'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users

    return (
      <div className="column">
        <h3>All Users</h3>
        {users ? (
          users.map(user => (
            <SingleUserDisplay
              key={user.id}
              email={user.email}
              fullName={user.fullName}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({users: state.admin.users})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
