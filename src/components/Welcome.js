import React from 'react';
import Header from './wel_comp/Header';
import Footer from './wel_comp/footer';
import PrivateRoute from "../PrivateRoute";
import UserHome from "./wel_comp/UserHome";
import Complaint from "./wel_comp/Complaint";
import AllComplaints from "./wel_comp/AllComplaints";
import {BrowserRouter,Route,Redirect} from 'react-router-dom';

function Welcome(props){

    return(
      <div >
      <div id="myHeader"><Header /></div>
      <div className="row">
      <PrivateRoute path = {"/welcome/home"} ><UserHome /></PrivateRoute>
      <PrivateRoute path = {"/welcome/newcomplaint"} ><Complaint /></PrivateRoute>
      <PrivateRoute path = {"/welcome/allcomplaint"} ><AllComplaints /></PrivateRoute>
      </div>
      <div><Footer /></div>
      </div>
  );
}

export default Welcome;
