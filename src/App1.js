import React,{Component} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Header from "./components/Header.Component";
import Footer from "./components/Footer.Component";
import Sidebar from "./components/Sidbar.Component";
import {connect} from "react-redux";
import {signout,signin,updateuser} from './actions/userActions';
import Axios from "axios";
import {server} from "./config";
import Loading1 from "./components/Loading1.Component";
import Signin1 from "./components/Signin1.Component";
import Config from "./components/Config.Component";
import Home from "./components/Admin.Component";
import Menu from "./components/Menu.Component";
import Notfound from "./components/Notfound.Component";
class App extends Component {
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
  return (
    <BrowserRouter>
    <div className="grid-container">
    <Header userSignin={this.props.userSignin} Signin={this.signIn} config={config} setUser={this.setUser} setLogout={this.setLogout} openMenu={this.openMenu} />
     <main className="main">
     {userSignin&&userSignin.userInfo &&
        <Sidebar closeMenu={this.closeMenu} />
        }  
       <div className="container">
          <Switch>
          <Route exact path='/config' component={()=><Config userSignin={userSignin}/>} />
          <Route exact path='/menus' component={()=><Menu userSignin={userSignin}/>} />
          <Route  exact path='/signin' component={()=><Signin1 userSignin={userSignin} signin={this.signIn} />} /> 

          <Route exact={true} path='/' component={()=><Home userInfo={this.state}/>}/>
                  <Route component={Notfound}/> 
          </Switch>


       </div>
     </main>
     <Footer />
    </div>
    </BrowserRouter>
  );
}
}

export default connect((state)=>({userSignin:state.userSignin}),{
  signout,signin,updateuser
})(App);
