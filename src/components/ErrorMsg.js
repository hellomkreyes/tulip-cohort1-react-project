import React from 'react';

const ErrorMsg = ({details}) => {
  return (
    <div className='error'>
      <h2>( ಠ_ಠ )</h2>
      <h3>Something Went Wrong!</h3>
      <p>Let's try again!</p>
      <p className='details'>{details.message}, {details.stack}</p>
    </div>
  );
}

export default ErrorMsg;