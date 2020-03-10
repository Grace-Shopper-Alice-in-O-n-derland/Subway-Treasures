import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const NewUserForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="form-signup">
        <div>
          <h1>
            <span className="sign-up">Sign Up</span>
          </h1>
          <p className="float">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" placeholder="Email" />
          </p>
        </div>
        <div>
          <p className="float">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="showPassword"
            />
          </p>
        </div>
        <div>
          <p className="float">
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" placeholder="FirstName" />
          </p>
        </div>
        <div>
          <p className="float">
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" placeholder="LastName" />
          </p>
        </div>
        <div>
          <p className="float">
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" placeholder="Address" />
          </p>
        </div>
        <div>
          <p className="clearfix">
            <button type="submit">{displayName}</button>
          </p>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      dispatch(auth(email, password, formName, firstName, lastName, address))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(NewUserForm)

/**
 * PROP TYPES
 */
NewUserForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
