import React,{Component} from 'react';
import InputComponent from './InputComponent';
import OutputComponent from './OutputComponent';

class Main extends Component{
    constructor(props){
        super(props)
        this.state={
           name:'' 
        }
    }
    handleInput = (event) => {
        console.log(event.target.value);
        console.log("event.target.value");
        this.setState({
            name: event.target.value
        })
    }
    render(){
        return(
            <div>
                <InputComponent 
                    handleInput={this.handleInput}
                    name={this.state.name}
                />
                <OutputComponent name={this.state.name}/>
            </div>
        )
    }

}
export default Main;