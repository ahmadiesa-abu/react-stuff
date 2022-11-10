import React from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';

const check_manager = async (manager, username, password) => {

    const encodedAuth = Buffer.from(`${username}:${password}`).toString('base64');     
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedAuth}`,
            'Tenant': 'default_tenant',
        }
    };
    axios.get(`http://${manager}/api/v3.1/version`, config)
        .then(res=> console.log(res))
        .catch(err=> console.log(err));
};

class CfyConnection extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {
        'manager': "",
        'username': "",
        'password': "",
      },
      errors: {},
      connectionStatus: "",
      managerDetails: "",
      fields: { manager: '', username: '', password: '' }
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
     
  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){

        let manager = this.state.input["manager"];
        let username = this.state.input["username"];
        let password = this.state.input["password"];

        
        check_manager(manager, username, password);
         
  
        let input = {};
        input["manager"] = "";
        input["username"] = "";
        input["password"] = "";
        this.setState({input:input});
        
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input["manager"]){
        isValid = false;
        errors["manager"] = "Please enter your manager.";      
      }
   
      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      <div>
        <h1>Cloudify Manager Username and Password Validation Example</h1>
        <form onSubmit={this.handleSubmit}>

        <div className="form-group">
            <label htmlFor="manager">Manager:</label>
            <input 
              type="text" 
              name="manager" 
              value={this.state.input.manager}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter manager" 
              id="manager" />
  
              <div className="text-danger">{this.state.errors.manager}</div>
          </div>
  
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={this.state.input.username}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter username" 
              id="username" />
  
              <div className="text-danger">{this.state.errors.username}</div>
          </div>
  
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.input.password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter password" 
              id="password" />
  
              <div className="text-danger">{this.state.errors.password}</div>
          </div>

          <input type="submit" value="Submit" className="btn btn-success" />
        </form>
        <table border="1px">
            <thead>
                <tr>
                    <th>Connection Status</th>
                    <th>Manager Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{this.state.connectionStatus}</td>
                    <td>{this.state.managerDetails}</td>
                </tr>
            </tbody>
        </table>
      </div>
    );
  }
}
  
export default CfyConnection;