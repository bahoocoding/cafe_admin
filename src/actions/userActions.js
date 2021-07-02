import Axios from 'axios';
import Cookie from 'js-cookie';
import {server} from '../config';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_UPDATE_SUCCESS} from '../constants/userConstants';



const signin=(email,password)=> async (dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
   try {
        const {data}=await Axios.post(server+"/users/signin",{email,password});         
        
        if (!data.error) {
            dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
            if (data.data){
                Cookie.set('userInfo',JSON.stringify(data.data));
            }
           
        }else {
            dispatch({type:USER_SIGNIN_FAIL,payload:data.error});
        }      
       
    } catch (error) {      
            dispatch({type:USER_SIGNIN_FAIL,payload:"Network Errors."});       
        
    }

}
const signout=(id,token)=>async (dispatch)=>{
   
    try {
        await Axios.get(server+"/users/signout/"+id,
        {headers:{
            authorization:'Bearer '+token
        }  });
        dispatch({type:USER_SIGNIN_SUCCESS,payload:null});       
        Cookie.set('userInfo',null);
    } catch (error) {
        dispatch({type:USER_SIGNIN_SUCCESS,payload:null});       
        Cookie.set('userInfo',null);
    }
}
const updateuser=(user)=>(dispatch)=>{  
    dispatch({type:USER_UPDATE_SUCCESS,payload:user});
    Cookie.set('userInfo',JSON.stringify(user));
}


export {signin,signout,updateuser};