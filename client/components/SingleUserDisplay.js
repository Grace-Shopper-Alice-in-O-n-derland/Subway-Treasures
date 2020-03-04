import React from 'react'

export default function(props) {
  return (
    <div>
      <p>
        Name: {props.firstName} {props.lastName}
      </p>
      <p>Email: {props.email}</p>
    </div>
  )
}
