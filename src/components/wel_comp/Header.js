import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import './header.css';
import { bake_cookie ,read_cookie ,delete_cookie} from 'sfcookies';

function Header(props){
  bake_cookie('login',props.isLoginSuccess);
  bake_cookie('name',props.uname);
  console.log('name from user',props.uname);
  return(
    <div className = 'header'>
      <div className="topnav">
        {props.isLoginSuccess&&<Link to={"/welcome/home"} ><a onClick>Home</a></Link>}
        {props.isLoginSuccess&&<Link to={"/welcome/newcomplaint"}><a onClick>New Complaint</a></Link>}
        {props.isLoginSuccess&&<Link to={"/welcome/allcomplaint"}><a onClick>All Complaints</a></Link>}
        <Link  to={"/"} style={{float: 'right'}}><a onClick ={props.onclick}  >Logout </a></Link>
      </div>
    </div>
  )
}
const mapStateToProps = (state)=> {
  return {
    isLoginSuccess: state.isLoginSuccess,
    uname: state.name
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onclick :()=>{
      bake_cookie('login',false);
      delete_cookie('json_response');
      const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
