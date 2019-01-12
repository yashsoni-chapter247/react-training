import React, { Component } from 'react';
import CharStyleModule from './char.module.css';

class Char extends Component {
    constructor(props) {
    super(props);
        this.state = {
            data: []
        };
    }

// componentWillReceiveProps(){
//     console.log(this.props.name)
//     this.state.data.push(this.props.name);
// }

static getDerivedStateFromProps(nextProps, prevState) {
    let newData = [...prevState.data];
    newData = nextProps.name.split('');
    return {
      data: newData
    };
  }

  removeChar(index){
    this.props.removeFromInput(index);
  }

    render(){
        return(
            <div>
                <ul>
                    {
                    this.state.data.map((data, index) => {
                        return <li onClick={() => this.removeChar(index)} key={index} className={CharStyleModule.charStyle}>{data}</li>
                    })
                    }
                </ul>
            </div>
        );
    }
}

export default Char;