import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Signin from './Signin.Component';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
class Signin1 extends Component{
    constructor(props){
        super(props);
        this.state={
                        
       }
       this._isMouted=false;
       this.onChange=this.onChange.bind(this);
       this.submitHandler=this.submitHandler.bind(this);
    }   
      componentDidMount=()=>{
        this._isMounted=true;
        const userSignin=this.props.userSignin;      
        const {errors}=userSignin; 
        this._isMounted&&this.setState({errors:errors})      
           
      }
     componentWillUnmount(){
      this._isMounted=false;
     }
    submitHandler=e=>{      
        e.preventDefault();
        this.setState({errors:{}});
        this.props.signin(this.state.email,this.state.password);        
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    signIn=(email,password)=>{
      this.props.signin(email,password);
    }
    render(){
        const userSignin=this.props.userSignin;  
        const {userInfo}=userSignin; 
        if (userInfo){       
            return <Redirect  to="/admin" />
        }
    return  <div className="container-fluid" >
    <Modal className="container" isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>   
      
      <Signin userSignin={userSignin} signin={this.signIn} />
  
  </Modal> 
    </div>
}
}

export default Signin1