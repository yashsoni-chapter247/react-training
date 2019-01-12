import React from 'react';

const Validation = (props) => {

  if (props.name.length === 0) {
    return (
      <p style={{color: 'red', fontSize: '12px'}}> Please Enter {props.type} </p>
    );
  } else if (props.name.length > 0 && props.name.length <= 5 ) {
    return (
      <p style={{color: 'red', fontSize: '12px'}}>{props.type} is too short</p>
    );
  } else if (props.name.length > 8) {
    return (
      <div>
        <p style={{color: 'red', fontSize: '12px'}}>{props.type} is too long</p>
      </div>
    );
  } else 
    return (
      <div>
        <p style={{color: 'green', fontSize: '12px'}}>{props.type} look good</p>
      </div>
    );
}

export default Validation;