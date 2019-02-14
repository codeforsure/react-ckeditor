import React from 'react';
import {Link} from "react-router-dom";
import './Forms/forms.css';

function Session(props){
    return(
      <div className='main'>
      <h1>Session Expired</h1>
      <Link to="/">Login here</Link>
      </div>
    )
}

export default Session;
