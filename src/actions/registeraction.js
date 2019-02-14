import Promise from 'es6-promise';
function setRegisterSuccess(isRegisterSuccess,name)
{
    return{
      type: "REGISTER_SUCCESS",
      isRegisterSuccess
    };
}
function setRegisterError(registerError)
{
    return{
      type: "REGISTER_ERROR",
      registerError
    };
}
export function Register(Name,Email,username,password){
    return dispatch => {
      dispatch(setRegisterSuccess(false));
      RegisterRequest(Name,Email,username,password)
      .then(success =>{
        dispatch(setRegisterSuccess(true));
      })
      .catch(err=>{
        dispatch(setRegisterError(err));
      })
  };
}
function RegisterRequest(name,email,username,password){
  return new Promise((resolve,reject) =>{
    console.log('...');
  fetch('http://localhost:8080/register', {
   method: 'post',
   headers: {'Content-Type':'application/json'},
   body: JSON.stringify({
     "userName":username,
 	   "pass":password,
 	   "email":email,
 	   "fullName":name
  })
}).then((res) => {
  console.log('json converted');
  console.log(res);
  return res;
})
 .then((res)=>{
   console.log("sucess");
   console.log(res.status);
   if(res.status === 200)
    return resolve(true);
 })
 .catch((err)=>{
   console.log("error",err);
   return reject(new Error('Cannot Register Complaint'));
});
  });
}
