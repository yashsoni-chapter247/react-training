import React from 'react';
const Person = (props) => {
    return (<div>
        <p>Hi, My name is {props.name}</p>
        {props.children}
        </div>)
}

export default Person;