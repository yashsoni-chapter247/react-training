import React, { Component } from "react";
import Person from "./components/Person/Person";
import "./App.css";
import Validation from "./components/Validation/validation";
import Char from "./components/Char/char";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from "react-bootstrap";
import { FieldGroup } from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ref = React.createRef();

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      employees: [],
      searchList: [],
      fname: "",
      lname: "",
      address: "",
      email: "",
      contact: "",
      addContactForm: false,
      btnValue: "Submit",
      show: false,
      editIndex: undefined,
      filtered: [],
      search: "",
      data: [],
      data_search: "",
      showData: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    // this.downloadPdf = this.downloadPdf.bind(this);
    this.onSearchData = this.onSearchData.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  shouldComponentUpdate() {
    console.log("App: shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("App: componentDidUpdate");
    console.log(this.state.employees);
  }

  componentDidMount() {
    let emp = [...this.state.employees];
    emp = [
      {
        fname: "Yash",
        lname: "Soni",
        address: "xyz",
        email: "yash@gmail.com",
        contact: "1234567890"
      },
      {
        fname: "Tushar",
        lname: "Goyal",
        address: "abc",
        email: "tushar@gmail.com",
        contact: "1234567890"
      },
      {
        fname: "Rohit",
        lname: "Taur",
        address: "pqr",
        email: "rohit@gmail.com",
        contact: "1122334455"
      }
    ];

    this.setState({
      employees: emp,
      searchList: emp
    });
  }

  printPDF = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("employee.pdf");
      })
    ;
}

  onSearchData() {
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: this.state.data_search },
        headers: {
          Authorization:
            "Client-ID c94079fa3fdda6ffb6ccee0720b80531ef1329d73bbcea2a44e2622b24c46dec"
        }
      },
      this.setState({showData: false})
      )
      .then(response => {
        this.setState({showData: true})
        this.setState({ data: response.data.results });
      });
  }

  handleInputs(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  deleteEmployee(i) {
    console.log("Delete Working");
    var emp = [...this.state.searchList];
    emp.splice(i, 1);
    this.setState({ searchList: emp });
  }

  editEmployee(i) {
    console.log("Edit Working");
    console.log(i);
    let empUpdated = [...this.state.searchList];
    var data = { ...empUpdated[i] };
    console.log(data);
    this.setState({
      fname: data.fname,
      lname: data.lname,
      address: data.address,
      email: data.email,
      contact: data.contact,
      editIndex: i,
      btnValue: "Edit"
    });
    this.setState({ show: true });
  }

  addEmployee(e) {
    console.log("Add Emp");
    console.log(
      this.state.fname,
      this.state.lname,
      this.state.address,
      this.state.email,
      this.state.contact
    );
    if (this.state.btnValue === "Submit") {
      let empUpdated = [...this.state.searchList];
      empUpdated.push({
        fname: this.state.fname,
        lname: this.state.lname,
        address: this.state.address,
        email: this.state.email,
        contact: this.state.contact
      });
      this.setState({
        searchList: empUpdated,
        fname: "",
        lname: "",
        address: "",
        email: "",
        contact: "",
        show: false
      });
    } else if (this.state.btnValue === "Edit") {
      let empUpdated = [...this.state.searchList];
      empUpdated[this.state.editIndex].fname = this.state.fname;
      empUpdated[this.state.editIndex].lname = this.state.lname;
      empUpdated[this.state.editIndex].address = this.state.address;
      empUpdated[this.state.editIndex].email = this.state.email;
      empUpdated[this.state.editIndex].contact = this.state.contact;
      this.setState({
        searchList: empUpdated,
        fname: "",
        lname: "",
        address: "",
        email: "",
        contact: "",
        show: false,
        editIndex: undefined
      });
    }
    e.preventDefault();
  }

  handleChangeSearch(e) {
    console.log(e.target.value);
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      let currentList = [...this.state.searchList];
      console.log(currentList);
      currentList = currentList.filter(function(item) {
        return (
          item.fname.toLowerCase().search(e.target.value.toLowerCase()) !==
            -1 ||
          item.lname.toLowerCase().search(e.target.value.toLowerCase()) !==
            -1 ||
          item.address.toLowerCase().search(e.target.value.toLowerCase()) !==
            -1 ||
          item.email.toLowerCase().search(e.target.value.toLowerCase()) !==
            -1 ||
          item.contact.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
        console.log("After search:" + this.currentList);
      });
      this.setState({
        [e.target.fname]: e.target.value,
        searchList: currentList
      });
    } else {
      newList = [...this.state.employees];
      this.setState({
        [e.target.fname]: e.target.value,
        searchList: newList
      });
    }
  }

  handleShow = () => {
    console.log("Its working!");
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  changeInput(index) {
    let n = this.state.name;
    n = n.split("");
    n.splice(index, 1);
    this.setState({ name: n.join("") });
  }


  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="App">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <Validation name={this.state.name} type={"Name"} />
          <Char
            removeFromInput={this.changeInput}
            name={this.state.name}
            type={"Name"}
          />
        </div>
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4>Employee Datatable From Local Array</h4>

                <div className="App">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search..."
                    name="search"
                    className="form-control"
                    aria-describedby="search"
                    onChange={this.handleChangeSearch}
                  />
                  <ul />
                </div>

                <td>
                  <p data-placement="top" data-toggle="tooltip" title="Add">
                    <button
                      onClick={this.handleShow}
                      className="btn btn-warning btn-xs"
                      data-title="Add"
                      data-toggle="modal"
                      data-target="#add"
                    >
                      {" "}
                      Add New{" "}
                      <span className="glyphicon glyphicon-plus"> </span>
                    </button>
                  </p>
                </td>
                <div className="table-responsive">
                  <table
                    id="mytable"
                    className="table table-bordred table-striped"
                  >
                    <thead>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </thead>

                    <tbody id="divToPrint" className="mt4">
                      {this.state.searchList.map((employee, index) => {
                        return (
                          <tr>
                            <td>{employee.fname}</td>
                            <td>{employee.lname}</td>
                            <td> {employee.address} </td>
                            <td>{employee.email}</td>
                            <td>{employee.contact}</td>
                            <td>
                              <p
                                data-placement="top"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                {" "}
                                <button
                                  onClick={() => this.editEmployee(index)}
                                  className="btn btn-primary btn-xs"
                                  data-title="Edit"
                                  data-toggle="modal"
                                  data-target="#edit"
                                >
                                  {" "}
                                  <span className="glyphicon glyphicon-pencil" />{" "}
                                </button>{" "}
                              </p>{" "}
                            </td>
                            <td>
                              {" "}
                              <p
                                data-placement="top"
                                data-toggle="tooltip"
                                title="Delete"
                              >
                                {" "}
                                <button
                                  onClick={() => this.deleteEmployee(index)}
                                  className="btn btn-danger btn-xs"
                                  data-title="Delete"
                                  data-toggle="modal"
                                  data-target="#delete"
                                >
                                  {" "}
                                  <span className="glyphicon glyphicon-trash" />{" "}
                                </button>{" "}
                              </p>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <i class="fa fa-file-excel-o" />
                    <h4> Export As:</h4>
                    <CSVLink className="btn btn-warning" data={this.state.employees}>
                      {" "}
                      Download in CSV File Format{" "}
                    </CSVLink>
                  </div>
                  <br/>
                  <div>
                    <button className="btn btn-primary" type="button" onClick={this.printPDF}>
                      Download in PDF format
                    </button>
                  </div>

                  {/* <div id="divToPrint" className="mt4">
                    <div>Note: Here the dimensions of div are same as A4</div>
                    <div>You Can add any component here</div>
                  </div> */}
                  <div>
                    <div className="static-modal">
                      <div>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title> Add New Employee </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form horizontal>
                              <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                  First Name
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.fname}
                                    onChange={this.handleInputs}
                                    name="fname"
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                  Last Name
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lname}
                                    onChange={this.handleInputs}
                                    name="lname"
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                  Address
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    type="text"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={this.handleInputs}
                                    name="address"
                                  />
                                </Col>
                              </FormGroup>

                              <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                  Email
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleInputs}
                                    name="email"
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                  Contact
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    type="text"
                                    placeholder="Contact"
                                    value={this.state.contact}
                                    onChange={this.handleInputs}
                                    name="contact"
                                  />
                                </Col>
                              </FormGroup>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                            <Button
                              type="submit"
                              onClick={this.addEmployee}
                              bsStyle="primary"
                            >
                              {" "}
                              Save{" "}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4>
                  API Datatable (Enter <strong>Any Word </strong> of your choice!)
                </h4>
                <div className="App">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search..."
                    name="search"
                    className="form-control"
                    aria-describedby="search"
                    value={this.state.data_search}
                    onChange={e =>
                      this.setState({ data_search: e.target.value })
                    }
                  />
                  <ul />
                </div>

                <td>
                  <p data-placement="top" data-toggle="tooltip" title="Add">
                    <button
                      onClick={this.onSearchData}
                      className="btn btn-warning btn-xs"
                      data-title="Add"
                      data-toggle="modal"
                      data-target="#add"
                    >
                      Search
                    </button>
                  </p>
                </td>
                
                {
                  !this.state.showData ?  
                  <div>   
                  <br/> <br/><br/><br/><br/>
                  <div class="ui active centered inline loader"></div></div> :
                
                <div className="col-md-12">
                  {this.state.data.map((response, index) => {
                    console.log(response);
                    return (
                      <img
                        style={{ padding: "4px", borderRadius: '50%'}}
                        className="ui medium circular image"
                        src={response.urls.regular}
                        height="200px"
                        width="200px"
                      />
                    );
                  })}
                </div>
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;