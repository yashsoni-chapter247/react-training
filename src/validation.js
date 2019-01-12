import React from "react";

const Validation = props => {
  if (props.name && props.name.length < 5) {
    return (
      <p style={{ color: "red", fontSize: "12px" }}>
        {props.type} is too short
      </p>
    );
  } else if (props.name && props.name.length > 5) {
    return (
      <div>
        <p style={{ color: "red", fontSize: "12px" }}>
          {props.type} is long enough
        </p>
      </div>
    );
  } else if (props.name && props.name.length === 5) {
    return (
      <div>
        <p style={{ color: "green", fontSize: "12px" }}>
          {props.type} look good now
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p style={{ color: "grey", fontSize: "12px" }}>
          Please enter {props.type}
        </p>
      </div>
    );
  }
};

export default Validation;