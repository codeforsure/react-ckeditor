import React from 'react';
import './forms.css';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { Register } from "../actions/registeraction";

class Registerform extends React.Component {
    state={
      Name:'',
      Email:'',
      username:'',
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    handleChange=(evt)=>{
      console.log("name",evt.target.name);
      console.log("value",evt.target.value);
      this.setState({
      [evt.target.name]: evt.target.value
      });
    }
    onSubmit=(e)=>{
      e.preventDefault();
      console.log("submit",this.state.Name,this.state.Email,this.state.username,this.state.password);
      this.props.Register(this.state.Name,this.state.Email,this.state.username,this.state.password);
    }
    render(){
    return(
          <div className='main'>
           <div className='Mainform' onSubmit ={this.onSubmit}>
           {this.props.isRegisterSuccess&&<div><p>Successfully Registered</p></div>}
              <form >
                <Input type='text' name='Name' placeholder='Full Name' onChange = {this.handleChange} />
                <Input type='text' name='Email' placeholder='Email' onChange = {this.handleChange}/>
                <Input type='text' name='username' placeholder='username' onChange = {this.handleChange}/>
                <Input type='password' name='password' placeholder='password'onChange = {this.handleChange} />
                <button type="submit"> Create</button>
              </form>
              <p >Already a user?<Link to={"/"} >Sign in</Link></p>
           </div>
           </div>
           );
    }
}
function Input(props) {
    return <div className='Input'>
              <input type={ props.type } name={ props.name } onChange={props.onChange} placeholder={ props.placeholder } required autoComplete='false'/>
              <label htmlFor={ props.name } ></label>
           </div>
}
const mapStateToProps = (state)=> {
  return {
    isRegisterSuccess: state.isRegisterSuccess,
    loginError : state.loginError
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    Register:(Name,Email,username,password) => dispatch(Register(Name,Email,username,password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registerform);
