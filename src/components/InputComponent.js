import React,{Component} from 'react';

class InputComponent extends Component{
    render(){
        return(
            <div>
                <p> Please Enter Some Text Here To Get on the Screen! </p>
                <input name="name" placeholder="Enter Text" value={this.props.name} onChange={this.props.handleInput} />
            </div>
        )
    }

}
export default InputComponent;