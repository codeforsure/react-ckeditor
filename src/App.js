import React, { Component } from 'react';
import Loginform from "./Forms/Loginform";
import Homepage from "./components/Homepage"
import Registerform from "./Forms/Registerform";
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import Welcome from "./components/Welcome.js";
import UserHome from "./components/wel_comp/UserHome";
import Complaint from "./components/wel_comp/Complaint";
import AllComplaints from "./components/wel_comp/AllComplaints";
import PrivateRoute from "./PrivateRoute";
import Session from "./session";
import Sample from "./components/wel_comp/sample"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path = {"/"} component = {Homepage} exact />
          <Route path = {"/register"} component ={Registerform}/>
          <Route path = {"/error"} component ={Session} />
          <Route path = {"/sample"} component ={Sample} />
          <PrivateRoute path = {"/welcome"} ><Welcome /></PrivateRoute>
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
