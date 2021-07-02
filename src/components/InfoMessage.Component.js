import React,{useState,useEffect} from 'react';
import { Fragment } from 'react';

const InfoMessage=(props)=>{
    const message=props.message;
    const show=props.show;
    const [showMessage,setShowMessage]=useState(show);

    useEffect(()=>{      
           if (showMessage){
            setTimeout(()=>setShowMessage(false),3000);
           }
            
        
    },[])
    return  <Fragment><div className="info-message" style={showMessage?{}:{display:'none'}}>
          {message}
      </div></Fragment>
       
   
}
export default InfoMessage;
