import React from 'react';
import { read_cookie } from 'sfcookies';

function UserHome(props){
  const name=read_cookie('name');
  return (
    <div style={{marginBottom:'485px'}}>
    <h1 align='center'>Hi, {name}!!</h1>
    <h1 align='center'>this is home page</h1>
    </div>
  );
}
export default (UserHome);
