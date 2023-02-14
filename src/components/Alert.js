import React from 'react'

const Alert = (props) => {
  return (
    <div>
      <div className='sticky-top' style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`} role="alert">
                <strong>{props.alert.message}</strong>
            </div>}
        </div>
    </div>
  )
}

export default Alert
