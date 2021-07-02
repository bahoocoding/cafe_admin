import React,{useState} from 'react';

import Loader from './Loading.Component';
import Axios from 'axios';
import {server} from '../config';
const ResetPassword =(props)=>{
    const [loading,setLoading]=useState(false);
    const [errors,setErrors]=useState({});
    const [error,setError]=useState('');
    const [msg,setMsg]=useState('');
    const [email,setEmail]=useState('');
    const [reset,setReset]=useState(true);
    const submitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setError(''); 
        setMsg('');       
        await Axios.post(server+"/users/resetpassword",{email}).then(
            (res)=>{
                setLoading(false);
                if (res.data.msg){
                         setMsg(res.data.msg)
                         setReset(false);
                         setEmail('');
                } else if (res.data.error) {
                    setError(res.data.error)
                } else if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    setError("There is a broblem with reseting your password");
                }
            },
            (err)=>{
                setLoading(false);
                setError("There is a problem with sending reset email.")
            }
        )

    }
   
    
    return <div className="row d-flex flex-column">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto" style={{marginTop:'1.5rem'}}>
        <div className="card card-signin  backgroundbg">
        <div className="card-body">     
            <div className="form-container">
	    <h2>Forgot your password?</h2>
	    <p>Change your password in three easy steps. This will help you to secure your password!</p>        
	    <ol className="list-unstyled">
	        <li><div><span className="text-primary text-medium">1. </span><span>Enter your email address below.</span></div></li>
	        <li><div><span className="text-primary text-medium">2. </span><span>Our system will send you a temporary link</span></div></li>
	        <li><div><span className="text-primary text-medium">3. </span><span>Use the link to reset your password</span></div></li>
	    </ol>
        </div>
        </div>
	    </div>
        </div>
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto"style={{marginTop:'1.5rem'}}>
        <div className="card card-signin  backgroundbg">
        <div className="card-body">         
          
          {loading && <div className="form-container" style={{marginBottom:'1rem'}}><div style={{textAlign:'center'}}> <Loader /></div></div>}
           {error && <div className="form-container"style={{marginBottom:'1rem'}}><div style={{textAlign:'center'}}><span style={{color:'green'}}><i className="fas fa-info"></i></span>{' '}{error}</div></div>}
           {msg && <div className="form-container"style={{marginBottom:'1rem'}}><div style={{textAlign:'center'}}><span style={{color:'green'}}><i className="fas fa-info"></i></span>{' '}{msg}</div></div>}
           <form  onSubmit={(e)=>submitHandler(e)}>
           <div className="form-container" >          
             <div className="form-group">
                  <label htmlFor="email">Enter your email address:</label>
                  <input 
                  type="email"
                  placeholder="example@gmail.com"
                  className={errors && errors.email? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                  id="email" 
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}>

                   </input>
                  {errors && errors.email && <small className="invalid-feedback">{errors.email}</small>}
              </div>             
                            
              <div className="p-2 d-flex flex-column">
                <div className="p-2" >                     
                  {!reset?null:loading? <button type="submit" style={{width:'100%',fontSize:'2rem'}} className="btn buttonbg btn-lg" disabled ><span style={{color:'orange'}}><i className="fas fa-key"></i></span>{' '}Get new password</button>:
                  <button type="submit" style={{width:'100%',fontSize:'2rem'}} className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="fas fa-key"></i></span>{' '}Get new password</button>}  
                 </div>   
                 <div className="p-2" >
                 <button style={{width:'100%',fontSize:'2rem'}} onClick={props.showSignin}className="p-2 btn btn-link btn-lg buttonbg1" ><span style={{color:'orange'}}><i className="fas fa-long-arrow-alt-left"></i></span>{' '}Back to Login</button>     
                 </div>
                 
             </div> 
      </div>              
      </form>
      
        </div>
      </div>
    </div>
 </div>
}
export default ResetPassword;