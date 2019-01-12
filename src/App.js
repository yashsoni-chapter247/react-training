import React, { Component } from "react";
import "./App.css";
import Validation from "./validation";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.manipulateInput = this.manipulateInput.bind(this);
  }

  handleInputs(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  manipulateInput(index) {
    let n = this.state.name;
    n = n.split("");
    n.splice(index, 1);
    this.setState({ name: n.join("") });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputs}
          />

          <br />

          <Validation name={this.state.name} type={"Name"} />
        </header>
      </div>
    );
  }
}

export default App;