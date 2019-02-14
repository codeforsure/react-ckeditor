import React, { Component } from 'react';
import './comp.css';
import {Link,Redirect} from "react-router-dom";
import { Markup } from 'interweave';
import Interweave from 'interweave';

function Sample(props){
    return (
            <div className="b">
            <div className="post">
                <h3>COMPLAINT_ID:{props.Id}</h3>
              <button id = {props.Id} onClick = {props.onDelete}>Delete</button>
              <button id ={props.complaint} onClick = {props.onView}>View/edit</button>
              <a style={{color:'red',padding:'10px',
              float :'right'}}>Pending</a>
                <p dangerouslySetInnerHTML={{__html: props.complaint}}></p>
            </div>
            </div>
    );
}


export default Sample;
