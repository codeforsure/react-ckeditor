import Promise from 'es6-promise';
import { bake_cookie ,read_cookie } from 'sfcookies';
function setLoginPending(isLoginPending)
{
    return{
      type: "LOGIN_PENDING",
      isLoginPending
    };
}
function setLoginSuccess(isLoginSuccess,name)
{
  console.log('namein action',name)
    return{
      type: "LOGIN_SUCCESS",
      isLoginSuccess,name
    };
}
function setLoginError(loginError)
{
    return{
      type: "LOGIN_ERROR",
      loginError
    };
}

export function login(name,password){

    return dispatch => {
      dispatch(setLoginPending(true));
      sendLoginRequest(name,password)
      .then(success =>{
        //dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true,name));
      })
      .catch(err=>{
        dispatch(setLoginError(err));
      })
  };
}
function sendLoginRequest(name,password){
  return new Promise((resolve,reject) =>{
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
       "username": name,
       "password": password })
     }).then((res) => {
       console.log("server response:",res);
       if(res.status === 200)
        return res.json()
        else {
          return reject(new Error('Invalid username and password'));
        }
      }).then(json=>{
        console.log("respone json",json);
        bake_cookie('json_response',json.accessToken);
        const accessToken = read_cookie('json_response')
        const bearer = 'Bearer '+accessToken;
        fetch('http://localhost:8080/name', {
          method: 'POST',
          headers: {
              'Authorization': bearer,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             "username": name})
          }).then(res=>{
              return resolve(true);}
            )
        })
      .catch((error) => {
      //message: 'Something bad happened ' + error

      });
  });
}
