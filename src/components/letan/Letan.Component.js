import React,{Component} from "react";
import Axios from "axios";
import {connect} from "react-redux";
import {signout,signin,updateuser} from '../../actions/userActions';
class Letan extends Component{
  constructor(props){
      super(props);
      this.state={}
  }
  render(){

    return <div className="grid-container">

      Le tan
    </div>
  }

}
export default connect((state)=>({userSignin:state.userSignin}),{
    signout,signin,updateuser
})(Letan);
