import React, { useState,useEffect } from 'react';



import Register from './Register.Component';
import Loader from './Loading.Component';
import ResetPassword from './ResetPassword.Component';
import { Fragment } from 'react';
const Signin=(props)=>{
   
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
  
   const [loading1,setLoading1]=useState(false);
   const [error1,setError1]=useState('');
   const [errors1,setErrors1]=useState({});
   const [showLogin,setShowLogin]=useState(true);
   const [showReset,setShowReset]=useState(false);
  
    const submitHandler=e=>{      
        e.preventDefault();
      //  if (captCha){
        setErrors1({});
        setError1('');
        props.signin(email,password);   
      //  }  else {
       //   setError1("reCaptcha must be Clicked.");
      //  }   
    }
    
   
   
   const showSignin=()=>{
     setShowLogin(true);
   }
   const ShowReset=()=>{
     setShowLogin(false);
     setShowReset(true);  
   }
    useEffect(() => {
       const {loading,error,errors}=props.userSignin;
       setLoading1(loading);
       setError1(error);
       setErrors1(errors);
      
       
    },[props.userSignin]);
     
    return showLogin ?<div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin backgroundbg" style={{marginTop:'1.5rem',padding:'1rem'}}>
          <div>           
            <h2 className="card-title text-center"><span style={{color:'orange'}}><i className="fas fa-user"></i></span>{' '}Sign in to Admin</h2>
          
            <hr></hr>
            <Fragment>
             {loading1 && <div className="form-container" style={{marginBottom:'1rem'}}><div style={{textAlign:'center'}}><Loader /></div></div>}
             {error1 && <div className="form-container" style={{marginBottom:'1rem'}}><div  style={{textAlign:'center'}}><span style={{color:'green'}}><i className="fas fa-info-circle"></i></span>{' '}{error1}</div></div>}
             </Fragment>
             <form  onSubmit={submitHandler}>
             <div className="form-container" >          
               <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    type="email"
                    placeholder="example@gmail.com"
                    className={errors1 && errors1.email? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="email" 
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>

                     </input>
                    {errors1 && errors1.email && <small className="invalid-feedback">{errors1.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    placeholder="enter your password"
                    className={errors1 && errors1.password? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="password" 
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>

                     </input> 
                    {errors1 && errors1.password && <small className="invalid-feedback">{errors1.password}</small>}
                </div>  
                             
                <div className="p-2 d-flex flex-wrap ">
                  <div className="p-2" style={{width:'40%'}}>                     
                    {loading1? <button type="submit" style={{width:'100%',fontSize:'2rem'}} className="btn buttonbg btn-lg" disabled ><span style={{color:'orange'}}><i className="fas fa-sign-in-alt"></i></span>{' '}Login</button>:
                    <button type="submit" style={{width:'100%',fontSize:'2rem'}} className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="fas fa-sign-in-alt"></i></span>{' '}Login</button>}  
                   </div>   
                   <div className="p-2 d-flex flex-column justify-content-end"> 
                    <button onClick={ShowReset} className="btn btn-link" style={{fontSize:'1.5rem'}}>Forgot your password?</button>
                    </div> 
               </div> 
        </div>              
        </form>
       
          </div>
        </div>
      </div>
    </div>    
  : showReset?<ResetPassword showSignin={showSignin} />:<Register showSignin={showSignin}  />
           
}


export default Signin