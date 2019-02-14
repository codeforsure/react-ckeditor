import React from 'react';
import ScrollArea from 'react-scrollbar';
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import { deleteComplaint } from "../../actions/complaintaction";
import Complaint from "./Complaint";
import {Link,Redirect} from "react-router-dom";
import Popup from 'reactjs-popup';
import Sample from "./sample.js";
class AllComplaints extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      complaints:[],
      isLoaded:false,
      viewopen: false,
      error :false
    }
  }
  componentDidMount(){
    const accessToken = read_cookie('json_response')
    const bearer = 'Bearer '+accessToken;
    console.log('precheck bearer',bearer);
    fetch('http://localhost:8080/complaint/add',{
      method: 'GET',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json',
      }
    })
      .then(res=>res.json())
      .then(json=>{
        console.log('response complaint',json)
        if(json.status===401){
          this.setState({
            error:true,
          })
        }
        this.setState({
          isLoaded:true,
          complaints: json,
        })
              console.log(this.state);
      })
      .catch((error) => {
          console.log(error);
          this.setState({
            error:true,
          })
      });
  }
  onclick=(e)=>{
    e.preventDefault();
    console.log(e.target.id);
    this.props.deleteComplaint(e.target.id);
  }
  handleView=(e)=>{
    e.preventDefault();
    var data = this.state.complaints.filter(complaint => complaint.complaint === e.target.id);
    var id = data[0].complaint_id;

    bake_cookie('complaint_id',id);
    localStorage.setItem('complaint',e.target.id);
    console.log("data from localStorage",localStorage.getItem('complaint'));
    this.setState({ viewopen: true })
    // this.props.onView(e.target.id);
  }
  render(){
    var {isLoaded,complaints} = this.state;
    var obj = [...this.state.complaints];
      return (

        <ScrollArea horizontal={false}>
          <div className = 'allcomplaints'>

          {this.state.viewopen&&<Redirect to= "/welcome/newcomplaint"/>}
          {this.state.error&&this.props.logout()}
          {this.state.error&&<Redirect to= "/error"/>}
          {this.props.isDeleteSuccess&& <div><h1>Complaint Deleted</h1>{window.location.reload()}</div>}
          {complaints.length?
        //   <table align="center" border="1" cellPadding="20">
        //     <thead>
        //         <tr>
        //             <th> Complaint Id </th>
        //             <th> Complaint </th>
        //             <th>Status</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //     {complaints.map(complaint=>(
        //         <tr key = {complaint.complaint_id}>
        //           <td id ="Id">{complaint.complaint_id} </td>
        //           <td> <Markup content ={complaint.complaint} /></td>
        //           <td style={{color:'red'}}>Pending</td>
        //           <td><button id = {complaint.complaint_id} onClick = {this.onclick} >Delete </button></td>
        //           <td><Link to={"/welcome/newcomplaint"} onClick = {this.handleView} id = {complaint.complaint} >View/Edit </Link></td>
        //         </tr>
        //       ))}
        //     </tbody>
        // </table>
        <div>
        {obj.sort((a,b)=>(a.complaint_id<b.complaint_id)?1:-1).map(complaint=>(
          <Sample Id ={complaint.complaint_id} complaint = {complaint.complaint} onDelete = {this.onclick} onView ={this.handleView} />
        ))}</div>
          : <h1 align="center">No complaints Registered</h1>}
        </div>
        </ScrollArea>

      );
}
}

const mapStateToProps = (state)=> {
  return {
    accessToken: state.accessToken,
    isDeleteSuccess:state.isDeleteSuccess
  };
}
const mapDispatchToProps = (dispatch)=> {
  return{
     deleteComplaint:(id)=>dispatch(deleteComplaint(id)),
     logout :()=>{
       bake_cookie('login',false);
       delete_cookie('json_response');
       const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
       dispatch(action);
     }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllComplaints);
