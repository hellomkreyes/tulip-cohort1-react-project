import React from 'react';

const ErrorMsg = ({details}) => {
  return (
    <div className='error'>
      <h2>!!!</h2>
      <p>Something Went Wrong!</p>
      <p>Let's try again!</p>
      <p className='details'>{details.message}, {details.stack}</p>
    </div>
  );
}

export default ErrorMsg;