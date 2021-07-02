import React,{Component} from 'react';
import Axios from 'axios';
import {server} from '../config';
import Loading1 from "./Loading1.Component";
import Modal from "react-modal";
class Menu1 extends Component{
    constructor(props){
        super(props);
        this.state={
            menus:null,
            loading:false,
            error:''
        }
        this._isMouted=false;
    }
    componentDidMount=async()=>{
        this._isMouted=true;
        this.setState({loading:true})
        try {
            await Axios.get(server+'/menus').then(
                (res)=>{
                    this._isMouted && this.setState({menus:res.data,loading:false})
                },
                (err)=>{
                  this._isMouted && this.setState({error:err.message,loading:false})
                }
              );
            
        } catch (error) {
            this._isMouted && this.setState({error:"loading failure",loading:false})
        }
        
    }
    componentWillUnmount(){
        this._isMouted=false;
    }
    render(){
       const {menus,loading,error}=this.state;
        return loading? <Loading1 show={loading}/>: <div className="container">
            {error && <div className="alert alert-warning">{error}</div>}
            
        </div>
    }
}
export default Menu1;