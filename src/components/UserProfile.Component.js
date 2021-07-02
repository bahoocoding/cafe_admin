import React,{Component} from 'react';
import Image from './Image1.Component';
import { Fragment } from 'react';
import Axios from 'axios';
import Loader from './Loading.Component';
import {server} from '../config';
class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state={
        uploading:false,
        errorupload:'',
        errors:null,
        name:'',
        phone:'',
        address:'',
        avatar:'',
        id:''
    }
     
    this.onChange=this.onChange.bind(this);
    this._isMouted=false;
    this.onSubmit=this.onSubmit.bind(this);
}  
  componentDidMount=async()=>{
      this._isMouted=true;
      const userInfo=this.props.userInfo;
      if(userInfo){
          this._isMouted&&this.setState({id:userInfo._id,name: userInfo.name,phone:userInfo.phone,address:userInfo.address});
          await Axios.get(server+"/users/avatar/"+userInfo._id).then(
            (res)=>{
                if (res.data.avatar){
                    this._isMouted&&this.setState({avatar:res.data.avatar})
                  
                }
            }
        )    
      }      
  }
  componentWillUnmount(){
      this._isMouted=false;
  }
 onSubmit=async(e,token)=>{
    e.preventDefault();
    this.setState({uploading:true});
    this.setState({errorupload:''});
    this.setState({errors:null});
    
   await Axios.post(server+"/users/update",{_id:this.state.id,name:this.state.name,phone:this.state.phone,address:this.state.address,
   avatar:this.state.avatar},{
     headers:{
       authorization:'Bearer '+token
    }
   }).then(
     (res)=>{
       this.setState({uploading:false});
       if (res.data.errors){
           if (res.data.errors.avatar){
               this.setState({errorupload:"Please update avatar."})
           }
        this.setState({errors:res.data.errors})
       }else if (res.data.data){   
           this.setState({name:'',phone:'',address:''})         
       
           const user=this.props.userInfo;
           if (user){
               user.name=res.data.data.name;
               user.phone=res.data.data.phone;
               user.address=res.data.data.address;        
               this.props.setUser(user);
           }    
           this.props.setAvatar(this.state.avatar)       
           this.props.closeProfile();
        }else{
           this.setState({errorupload:res.data.error});
        }
       
     },
     (err)=>{
       this.setState({errorupload:"Failure in updating the account."})
       this.setState({uploading:false});
     }
   );
}
 setAvatar=(src)=>{
    this.setState({avatar:src});  
   
}

onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
closeProfile=()=>{
    this.props.closeProfile();
}
render(){
const {uploading,errors,errorupload,avatar}=this.state;

const userInfo=this.props.userInfo;
return <div className="row">
 
<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
<div className="card card-signin backgroundbg" style={{marginTop:'1.5rem',padding:'1rem'}}>
<div>   
<form onSubmit={(e)=>this.onSubmit(e,userInfo.token)}>   
<div className="d-flex flex-column align-items-center justify-content-center"> 

   <div className="btn btn-light"style={{borderRadius:'50%',height:'80px',width:'80px',padding:'0px'}}>             
          <Image Img={avatar} setImage={this.setAvatar} style={{height:'80px',width:'80px',cursor:'pointer',borderRadius:'50%',alignSelf:'center'}}/>                    
    </div> 
    {errors&&errors.avatar&&<small className="invalid-feedback">{errors.avatar}</small>}          
</div>

<hr/>

<Fragment>
{errorupload && <div className="form-container" style={{marginBottom:'1rem'}}><div style={{textAlign:'center'}}><span style={{color:'green'}}><i className="fas fa-info-circle"></i></span>{' '}{errorupload}</div></div>}
{uploading && <div className="form-container"style={{marginBottom:'1rem'}}><div><Loader /></div></div>}


</Fragment>

<div className="form-container">
<div className="form-group ">
    <label htmlFor="name">
    <span style={{color:'orange'}}><i className="fab fa-adn"></i></span>{' '} Full Name:
          </label>
          <input
           type="text" 
           className={errors && errors.name? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
           name="name" 
           id="name"
           value={this.state.name}
           onChange={this.onChange}
           />

          {errors && errors.name && <small className="invalid-feedback">{errors.name}</small>}
         
 </div>
 <div className="form-group ">
    <label htmlFor="phone">
    <span style={{color:'orange'}}><i className="fas fa-phone"></i></span> {' '}Phone:
          </label>
          <input
           type="text" 
           className={errors && errors.phone? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
           name="phone" 
           id="phone"
           value={this.state.phone}
           onChange={this.onChange}
           />

          {errors && errors.phone && <small className="invalid-feedback">{errors.phone}</small>}
 </div>
 <div className="form-group ">
    <label htmlFor="address">
    <span style={{color:'orange'}}><i className="fas fa-map-marker-alt"></i></span>{' '}Address:
          </label>
          <textarea
           type="text" 
           className={errors && errors.address? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
           name="address" 
           id="address"
           value={this.state.address}
           onChange={this.onChange}
           />

          {errors && errors.address && <small className="invalid-feedback">{errors.address}</small>}
 </div>

 
</div>
<div className="p-2 d-flex flex-column" >
  {uploading? <button type="submit" style={{fontSize:'2rem',marginTop:'2rem'}} className="btn buttonbg" disabled>Save Profile</button>:
 <button type="submit" style={{fontSize:'2rem',marginTop:'2rem'}} className="btn buttonbg " ><span style={{color:'orange'}}><i className="fas fa-save"></i></span>{' '}save profile</button>
   }
 <button style={{fontSize:'2rem',marginTop:'2rem'}} className="btn buttonbg1" onClick={this.closeProfile}><span style={{color:'orange'}}><i className="far fa-window-close"></i></span>{' '}Cancel</button>
 
</div>
</form>
</div>
</div>
</div>
</div>
}
}
export default UserProfile;