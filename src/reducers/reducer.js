import {read_cookie,delete_cookie } from 'sfcookies'
const initialState = {
  isLoginPending: false,
  isLoginSuccess: false,
  loginError :null,
  isLogoutSuccess :false,
  isRegisterSuccess:false,
  registerError:null,
  isComplaintSuccess:false,
  complaintError:null,
  isDeleteSuccess:false,
  isUpdateSuccess:false,
  deleteError:null,
  name :'',
  accessToken:'',
}
export default function reducer(state=initialState,action) {
  state.isLoginSuccess=read_cookie('login');
  state.name = read_cookie('name');
  state.accessToken = read_cookie('json_response')
  console.log('response',read_cookie('json_response'));
  console.log('cookie',state.isLoginSuccess);
  switch (action.type){
    case "LOGIN_SUCCESS":
    return{
      ...initialState,
      isLoginSuccess: action.isLoginSuccess,
      name : action.name,
    }
    case "LOGIN_PENDING":
    return{
      ...state,
      isLoginPending: action.isLoginPending
    }
    case "LOGIN_ERROR":
    return{
      ...state,
      loginError: action.loginError,
      isLoginPending : false
    };
    case "REGISTER_SUCCESS":
    return{
      ...state,
      isRegisterSuccess : action.isRegisterSuccess,
    };
    case "REGISTER_ERROR":
    return{
      ...state,
      registerError : action.registerError,
    };
    case "COMPLAINT_SUCCESS":
    return{
      ...state,
      isComplaintSuccess : action.isComplaintSuccess,
    };
    case "COMPLAINT_ERROR":
    return{
      ...state,
      complaintError : action.complaintError,
    };
    case "DELETE_SUCCESS":
    return{
      ...state,
      isDeleteSuccess : action.isDeleteSuccess,
    };
    case "UPDATE_SUCCESS":
    return{
      ...state,
      isUpdateSuccess : action.isUpdateSuccess,
    };
    case "DELETE_ERROR":
    return{
      ...state,
      deleteError : action.deleteError,
    };
    case "LOGOUT_SUCESS":
    delete_cookie('json_response');
    delete_cookie('name');
    delete_cookie('login');
    delete_cookie('json response');
    return{
      ...initialState,
      isLogoutSuccess : action.isLogoutSuccess
    };
    default:
      return state;
  }
}
