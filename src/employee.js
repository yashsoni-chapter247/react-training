import React,{Component} from 'react'
class App extends Component{
    constructor(props){
        super(props)
        this.state={
            employee:[
                {
                    name:"Yash ",
                    gender:"Male",
                    role:"Developer"
                },
                {
                    name:"Tushar",
                    gender:"Male",
                    role:"Meanstack Developer"
                },
                {
                    name:"Rohit",
                    gender:"Male",
                    role:"UI Developer"
                },
                {
                    name:"Aayushi",
                    gender:"Female",
                    role:"Developer"
                }
            ]
        }
    }
    render(){
        const data = () => {
          return this.state.employee.map((element, index) => {
            return <tr key={index}>
              <td>{element.name}</td>
              <td>{element.role}</td>
              <td>{element.gender}</td>
            </tr>
          })
        }
        return(
            <div>
                <h3>Employee Details</h3>
                <table className="table-bordered responsive table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data()}
                    </tbody>
                </table>
            </div>
        )
    }

}
export default App;