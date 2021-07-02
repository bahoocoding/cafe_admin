import React,{Component} from 'react';
import Loading from './Loading1.Component';
import Axios from 'axios';
//import ReCAPTCHA from "react-google-recaptcha";
class Register extends Component{
 constructor(props){
        super(props);
        this.state={
            uploading:false,
            errorupload:'',
            msg:'',
            errors:null,
            name:'',
            email:'',
            password:'',
            passwordconfirmation:''
         
        }
        this.submitHandler=this.submitHandler.bind(this);
        this.onChange=this.onChange.bind(this);
       
    }
    onChange=(e)=>{
       this.setState({[e.target.name]:e.target.value});
    }
    submitHandler=async(e)=>{
       
        e.preventDefault();
        this.setState({errors:null,uploading:true})
        await Axios.post("/users/register",{name:this.state.name,email:this.state.email,password:this.state.password,
        passwordconfirmation:this.state.passwordconfirmation}).then(
            (res)=>{
                this.setState({name:'',email:'',password:'',passwordconfirmation:''})
               if (res.data.errors){
                   this.setState({errors:res.data.errors,uploading:false});
               } else {
                   this.setState({msg:res.data.msg,uploading:false});
               }
            },
            (err)=>{
               this.setState({errorupload:err,uploading:false})
            }
        );
        
    }
  
 render(){
     const {uploading,errorupload,msg,errors}=this.state;
    return uploading?<Loading show={uploading}/>:<div className="container-fluid">
        <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5" style={{background: "linear-gradient(to right,rgb(210 222 143),rgb(132 148 111))"}}>
          <div className="card-body">
            <h1 className="card-title text-center">Register</h1>
            <hr></hr>         
             {errorupload && <div className="alert alert-warning">{errorupload}</div>}
             {msg && <div className="alert alert-info">{msg}</div>}
             <div className="form-container" >
            <form  onSubmit={this.submitHandler}>
            <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                    type="text" 
                    className={errors && errors.name? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="name" 
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.name && <small className="invalid-feedback">{errors.name}</small>}
                </div>
               <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    type="email" 
                    className={errors && errors.email? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="email" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.email && <small className="invalid-feedback">{errors.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    className={errors && errors.password? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.password && <small className="invalid-feedback">{errors.password}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="passwordconfirmation">Password confirm:</label>
                    <input 
                    type="password" 
                    className={errors && errors.passwordconfirmation? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="passwordconfirmation" 
                    name="passwordconfirmation"
                    value={this.state.passwordconfirmation}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.passwordconfirmation && <small className="invalid-feedback">{errors.passwordconfirmation}</small>}
                </div>
                
                <div className="text-center">              
                    {uploading? <button type="submit" className="btn btn-primary btn-lg" disabled >Register</button>:
                    <button type="submit" className="btn btn-primary btn-lg" >Register</button>}                                      
              </div>            
        </form>
        </div>
          </div>
        </div>
      </div>
    </div> 
    </div>

    </div>
    }
}
export default Register;