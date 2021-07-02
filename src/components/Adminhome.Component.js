
import React from 'react';
import {Redirect} from "react-router-dom";
const Adminhome=(props)=>{
   if (!props.userInfo){
     return <Redirect to="/admin/signin"/>
   }
    return <div>
        Admin Home
    </div>
}
export default Adminhome;
