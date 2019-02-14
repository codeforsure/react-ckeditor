import React from 'react';
import './forms.css';
import Registerform from "./Registerform.js";
import Welcome from "../components/Welcome.js"
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from "../actions/useractions";
import { bake_cookie ,read_cookie } from 'sfcookies';

class Loginform extends React.Component {;
  state = {
    name: '',
    password: ''
  }
  onChangeName = e =>{
    console.log(e.target.value);
    this.setState({name:e.target.value});
  }
  onChangepass = e =>{
    this.setState({password:e.target.value});
  }
  // componentDidUpdate = () => {
  //
  //   console.log('cookie',read_cookie('login'));
  // }
  render() {
    let {isLoginPending,isLoginSuccess,loginError} = this.props;
    console.log(isLoginSuccess);
    return(
          <div className='main'>
          <h1 align="center" >Welcome!! Login here</h1>
           <div className='Mainform' onSubmit ={this.onSubmit}>
           {isLoginPending&&<div>Please wait....</div>}
           { loginError&&<div><p>{loginError.message}</p></div>}
           {isLoginSuccess===true&&<div><Redirect to={"/welcome/home"} /></div>}
              <form  >
                <Input type='text' name='name' placeholder='username' onChange={this.onChangeName} value={this.state.name}/>
                <Input type='password' name='password' placeholder='password' onChange={this.onChangepass} value={this.state.password}/>
                <button type="submit"> Sign In</button>
              </form>
                <p><Link to={"/register"}>Create Account</Link></p>
           </div>
           </div>
           );
  }
  onSubmit=(e)=>{
    e.preventDefault();
    let {name,password}=this.state;
    console.log(name+'..submit..'+password);
    this.props.login(name,password);
  }
}
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } onChange={this.props.onChange} required autoComplete='false'/>
              <label htmlFor={ this.props.name } ></label>
           </div>
  }
}
const mapStateToProps = (state)=> {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError : state.loginError
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    login:(name,password) => dispatch(login(name,password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loginform);
