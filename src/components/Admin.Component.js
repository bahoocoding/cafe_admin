import React,{Component} from 'react';
import { BrowserRouter,Route,Switch } from "react-router-dom";

import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Header from "./Header.Component";
import Footer from "./Footer.Component";
import Sidebar from "./Sidbar.Component";
import Signin1 from "./Signin1.Component";
import Config from "./Config.Component";
import Menu from "./Menu.Component";
import {signout,signin,updateuser} from '../actions/userActions';
import Axios from "axios";
import {server} from "../config";
import Loading1 from "./Loading1.Component";
import Adminhome from "./Adminhome.Component";
class Admin extends Component{
    constructor(props){
        super(props);
        this.state={
          config:null,
          loading:true,
          error:'',
        }
        this._isMouted=false;
    }
    componentDidMount=async()=>{
      this._isMouted=true;
       await  Axios.get(server+"/configs").then(
          res=>{   
          
           this._isMouted && this.setState({config:res.data,loading:false});         
          },err=>{
              this._isMouted && this.setState({error:err});
              this._isMouted && this.setState({loading:false});
          }
       );  
    
        
     };
     componentWillUnmount(){
       this._isMouted=false;
     }
     setLogout=()=>{
      const {userInfo}=this.props.userSignin;
       this.props.signout(userInfo._id,userInfo.token)
       this.setUser(null)
     }
     signIn=(email,password)=>{
       this.props.signin(email,password);
       
     }
     setUser=(user)=>{
       this.props.updateuser(user);
     }
    
     openMenu=()=>{
      document.querySelector(".sidebar").classList.add("open");
      }
      closeMenu=()=>{
       document.querySelector(".sidebar").classList.remove("open");
      }

    render(){
    const {loading,config}=this.state;
    const userSignin=this.props.userSignin;
    if (loading){
      return <Loading1 show={loading} />
      }
        const {userInfo}=this.props.userSignin;
     //  if(!userInfo){
     //   return <Redirect to="/admin/signin"/>
     //  }

        return <div className="grid-container">
          <BrowserRouter>
          <Header userSignin={this.props.userSignin} Signin={this.signIn} config={config} setUser={this.setUser} setLogout={this.setLogout} openMenu={this.openMenu} />
          <main className="main">
          {userSignin&&userSignin.userInfo &&
           <Sidebar closeMenu={this.closeMenu} />  }  
      
         <Switch>
          <Route exact path='/admin/config' component={()=><Config userSignin={userSignin}/>} />
          <Route exact path='/admin/menus' component={()=><Menu userSignin={userSignin}/>} />
          <Route  exact path='/admin/signin' component={()=><Signin1 userSignin={userSignin} signin={this.signIn} />} /> 
          <Route exact path='/admin' component={()=><Adminhome userInfo={userInfo} />} />
         
         


          </Switch>
     </main>
     <Footer />

     </BrowserRouter>
        </div>
           
   
    }
}
export default connect((state)=>({userSignin:state.userSignin}),{
  signout,signin,updateuser
})(Admin);