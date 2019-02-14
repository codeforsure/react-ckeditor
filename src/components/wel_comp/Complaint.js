import React from 'react';
import CKEditor from "react-ckeditor-component";
import {Redirect} from "react-router-dom";
import './header.css';
import { Complaints } from "../../actions/complaintaction";
import { updateComplaint } from "../../actions/complaintaction";
import { connect } from 'react-redux';
import AllComplaints from "./AllComplaints";
import {Link} from "react-router-dom";
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';

class Complaint extends React.Component{
  state = {
    content: localStorage.getItem('complaint'),
    update : false,
  }
  onChange=(evt)=>{
    console.log("onChange: ", evt.editor.getData());
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }
  componentDidMount(){
    if(localStorage.getItem('complaint') !== '')
    {
      console.log('update staus changed');
      this.setState({
          update:true,
      })
    }

    console.log('complaint changed');
    localStorage.setItem('complaint','')
  }
  onSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state.content,"from content")
    if(this.state.update){
      var id = read_cookie('complaint_id');
      console.log(id)
      this.props.updateComplaint(id,this.state.content);
    }
    else{
      this.props.Complaints(this.state.content);
    }
  }
  render(){
    let {isComplaintSuccess,complaintError,isUpdateSuccess,updateError} = this.props;
    return (
      <div align='center' onSubmit ={this.onSubmit}>
      <form >
      {isComplaintSuccess&&<div><h1>Successfully Registered the complaint</h1><Redirect to={"/welcome/newcomplaint"} /></div>}
      {isUpdateSuccess&&<div><h1>Complaint Successfully updated</h1></div>}
      {complaintError&&this.props.logout()&&<div><Redirect to={"/error"} /></div>}
      {updateError&&this.props.logout()&&<div><Redirect to={"/error"} /></div>}
      <h1 align='center'>Drop Your Complaints Here</h1>
      <CKEditor activeClass="p10" content={this.state.content}
      events={{"change": this.onChange}}
      config={{
         height:'370px',
         width:'90%',
         uiColor :'#AADC6E',
         fullPage : true,
         toolbarGroups : [
    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'links' },
    '/',
    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    { name: 'insert' },
    '/',
    { name: 'styles' },
    { name: 'colors' },
    { name: 'tools' },
    { name: 'others' },],
      }}
    />
      <button  className="but1" type="submit" >{this.state.update ? <div>Update Complaint</div> :<div>Submit Complaint</div>}</button>
      </form>
      {this.state.update&&<Link  to={"/welcome/allcomplaint"}><a >All Complaints</a></Link>}
      </div>
    );

  }
}
const mapStateToProps = (state)=> {
  return {
    isComplaintSuccess: state.isComplaintSuccess,
    complaintError :state.complaintError,
    isUpdateSuccess :state.isUpdateSuccess,
    updateError : state.updateError
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    Complaints :(complaint)=>{dispatch(Complaints(complaint))},
    updateComplaint:(id,complaint)=>{dispatch(updateComplaint(id,complaint))},
    logout :()=>{
      bake_cookie('login',false);
      delete_cookie('json_response');
      const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Complaint);
