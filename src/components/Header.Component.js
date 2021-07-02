import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import Axios from 'axios';
import {server} from '../config';

import UserProfile from '../components/UserProfile.Component';

class Header extends Component{
  constructor(props){
      super(props);
      this.state={
          openModal:false,         
          avatar:''
         
      }
      this.handleLogout=this.handleLogout.bind(this);
      this.openModal=this.openModal.bind(this);
      this.closeModal=this.closeModal.bind(this);     
      this.setAvatar=this.setAvatar.bind(this);
      this.closeMenu=this.closeMenu.bind(this);
      this._isMouted=false;
  }
  componentDidMount=async()=>{
      this._isMouted=true;
      this.props.userInfo&& await Axios.get(server+"/users/avatar/"+this.props.userInfo._id).then(
        (res)=>{
            if (res.data.avatar){
               this._isMouted&&this.setState({avatar:res.data.avatar})
            }
        }
    )
  }
  componentWillUnmount(){
      this._isMouted=false;
  }
  setUser(user){   
   this.props.setUser(user);
  }
  handleLogout=()=>{      
      this.props.setLogout();         
  }
  
  openModal=(userinfo)=>{
     this.setState({openModal:true,errorupload:''});
     this.setUser(userinfo);
    
  }
  setAvatar=(src)=>{
    this.setState({avatar:src});
  }
  closeModal=()=>{
    this.setState({openModal:false});
  }
  openSignin=()=>{
    this.setState({showSignin:true})
  }
  
  setAvatar=(src)=>{
    this.setState({avatar:src});
  }
  closeMenu=()=>{
   // document.querySelector(".sidebar").classList.remove("open");
}
  signin=(email,password)=>{
    this.props.signIn(email,password);
  }
  render(){     
    const config =this.props.config;
    const {openModal,avatar}=this.state;
    const userSignin=this.props.userSignin;
    const {userInfo}=userSignin;  
     
    return <header className="header" >
    <div className="brand">
    {userInfo && <div><button onClick={this.props.openMenu}>
                   <span style={{color:'orange'}}><i className="fas fa-bars"></i></span>
                </button></div>}
                <div className="d-none d-lg-block">
      <Link   to={'/'} ><span style={{color:'ra'}}><i className="fas fa-home"></i></span>{' '}{config && config.Company_Name}</Link>
      </div>
    </div>
    <div className="header-links">
    {
        !userInfo? <div><Link to={'/admin/signin'} onClick={this.closeMenu}className="btn buttonbg" style={{fontSize:'2rem'}} ><span style={{color:'orange'}}><i className="fas fa-sign-in-alt"></i></span>{' '}Signin</Link></div>:
        <div className="btn-group">
      <button className="btn buttonbg dropdown-toggle" style={{fontSize:'2rem'}} id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span style={{color:'orange'}}><i className="fas fa-user"></i></span>{' '}{userInfo.name}
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">       
        
        {avatar?<div className="dropdown-item text-center"><img  style={{height:'30px',width:'30px',borderRadius:'50%',marginTop:'1rem',cursor:'pointer'}}src={avatar} onClick={()=>this.openModal(userInfo)} alt="" /></div>:<button onClick={()=>this.openModal(userInfo)}className="dropdown-item " style={{marginTop:'1rem',fontSize:'2rem'}} ><span style={{color:'orange'}}><i className="fas fa-id-card"></i></span>{' '}<b>User Profile</b></button>}
       
        <button style={{color:'red',marginTop:'1rem',fontSize:'2rem'}} className="dropdown-item" onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i>{' '}<b>User Log out</b></button> 
      </div>
      </div>
  }
      
    </div>
       <Modal className="container" isOpen={openModal} onRequestClose={this.closeModal} ariaHideApp={false}>   
       <Zoom>
       {openModal&& <UserProfile userInfo={userInfo} setUser={this.props.setUser}closeProfile={this.closeModal} setAvatar={this.setAvatar} />}
       </Zoom>
      </Modal>
      
  </header>
}
}
export default Header;