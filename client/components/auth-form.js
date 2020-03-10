import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} className="form-login">
        <div>
          <h1>
            <span className="log-in">Log In</span>
          </h1>
          <p className="float">
            <label htmlFor="email">
              <i className="icon-user" />
              <small>Email</small>
            </label>
            <input name="email" type="text" placeholder="Email" />
          </p>
        </div>
        <div>
          <p className="float">
            <label htmlFor="password">
              <i className="icon-lock" />
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

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
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
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
