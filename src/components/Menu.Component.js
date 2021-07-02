import React,{Component} from 'react';
import Loader from './Loading1.Component';
import Modal from 'react-modal';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Image from "./Image.Component";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { Fragment } from 'react';
import {editorConfiguration} from '../config';
import {server} from '../config';


class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            error:'',
            menus:[],
            newMenu:null,
            errors:null,
            uploading:false,
            errorupload:''

        }
        this._isMouted=false;
        this.closeModal = this.closeModal.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.onEditorChange=this.onEditorChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setEnabled=this.setEnabled.bind(this);
        this.setAvatar=this.setAvatar.bind(this);
        this.deleteHandler=this.deleteHandler.bind(this);
        this.selectMenu=this.selectMenu.bind(this);
    }
    componentDidMount=()=>{
       this._isMouted=true;
       const {userInfo}=this.props.userSignin;
       if (userInfo){
              this.fetchMenus(userInfo.token);
       }
       
    }
    async fetchMenus(token){
        this.setState({loading:true})
        await Axios.get(server+'/menus/all',{
            headers:{
              authorization:'Bearer '+token
            }
        }).then(
           res=>{
               this._isMouted&& this.setState({loading:false,menus:res.data});           
           },err=>{

              this.setState({loading:false,error:"Can not load the menus list."})

           }
           

        );     
    }
    componentWillUnmount(){
        this._isMouted=false;
    }
    onSubmit=async(e,token)=>{
        e.preventDefault();
        const newMenu=this.state.newMenu;
        this.setState({uploading:true});
        await Axios.post(server+'/menus',{Id:newMenu.Id,Name:newMenu.Name,
            Price:newMenu.Price,Order:newMenu.Order,
        Description:newMenu.Description,Avatar:newMenu.Avatar,Content:newMenu.Content, Enabled:newMenu.Enabled},{
                 headers:{
                    authorization:'Bearer '+token
                 }
        }).then(
            res=>{
                if (res.data.errors){
                    this.setState({uploading:false,errors:res.data.errors});
                }else{
                    this.setState({uploading:false,newMenu:null});
                    this.fetchMenus(token);                   
                }
            },err=>{
                this.setState({uploading:false,errorupload:err.message});
            }
        )

    }
    setAvatar=(src)=>{
        this.setState(prevState=>({newMenu:{...prevState.newMenu,Avatar:src}}));   
    }
    onChange1=(e)=>{
        this.setState(prevState=>({newMenu:{...prevState.newMenu,[e.target.name]:e.target.value}}));
    }
    onEditorChange( data ) {
        this.setState(prevState=>({newMenu:{...prevState.newMenu,Content:data}}));        
    }

    handleChange( changeEvent ) {
        this.setState(prevState=>({newMenu:{...prevState.newMenu,Content:changeEvent.target.value}})); 
        
    }
    setEnabled=async(i,item,token)=>{       
        const data = this.state.menus;
        const menu=item;
        let enabled=item.Enabled;      
        await Axios.post(server+"/menus/setenabled",{Id:data[i].Id,Enabled:!enabled},{
            headers:{
                authorization:'Bearer '+token
             }
        }).then(
            (res)=>{
               
                    menu.Enabled=res.data.data;
                    data[i]=menu;
                    this.setState({menus:data})
               
                
            }
        );
        
    }
    closeModal=()=>{
        this.setState({newMenu:null});
    }
    deleteHandler=async(id,token)=>{
        await Axios.get(server+"/menus/delete/"+id,{
            headers:{
                authorization:'Bearer '+token
             }
         }).then(
             (res)=>{
                if(res.data.data){
                    const data=this.state.menus.filter(item=>item.Id!==id);
                    this.setState({menus:data});
                }
             },
             (err)=>{
                 
             }
         );
       
       
    }
    selectMenu=async(item)=>{
        this.setState({newMenu:item,errors:null})
        await Axios.get(server+"/menus/content/"+item.Id).then(
            (res)=>{
                if (res.data.Content){
                    this.setState(prevState=>({newMenu:{...prevState.newMenu,Content:res.data.Content}}));
                }
            }
        );
        
    }
    render(){
       const {loading,error,menus,newMenu,errors,uploading,errorupload}=this.state;
       const {userInfo}=this.props.userSignin;
      
       if (!userInfo) return <Redirect to="/signin" />
        return loading?
        <Loader show={loading}/>
       : <div className="container">
          
            { error && <div className="alert alert-warning">{error}</div>}
              <Fade bottom cascade={true}>
              
         <div style={{padding:'1rem'}}className="container">            
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} className="row">
              <h2 className="d-none d-lg-block" style={{marginBottom:'0px'}}><span style={{color:'orange'}}><i className="fas fa-th-large"></i></span>{' '}Manage Menus</h2>  
             <input style={{borderRadius:'.2rem',width:'30%'}}type="text" placeholder="Search Menu..." onChange={(e)=>this.onChange(e)}></input>
              <button className="btn buttonbg btn-lg" onClick={()=>this.setState({newMenu:{Id:'',Name:'',Description:'',Price:0,Order:0,Avatar:'',Content:'',Enabled:false},errors:null})}><span style={{color:'orange'}}><i className="fas fa-plus"></i></span>{' '}Add New Menu</button>
              </div>
              <hr/>
             <div  style={{height:'73vh',overflowY:'auto',overflowX:'hidden'}}>
                 <div className="row" style={{padding:'.5rem'}}>
                 {menus.map((item,i)=>(
                     <div key={item.Id} className="col-md-6 col-12 col-lg-4 d-flex flex-column border-bottom justify-content-end" >
                         <div className="mb-auto" >
                         <div onClick={()=>this.selectMenu(item)} style={{textAlign:'justify',cursor:'pointer'}} className="w-100"><h3><span style={{color:'orange'}}><i className="fas fa-arrow-alt-circle-right"></i></span>{' '}{item.Name}</h3></div>
                        
                          </div>  
                          <div className="container-image">
                           <img  src={item.Avatar} className="image w-100 rounded" style={{maxHeight:'150px',minHeight:'150px',cursor:'pointer'}} alt={item.Name} onClick={()=>this.selectMenu(item)}/>
                           <div className="middle">
                               <Zoom forever={true} duration={6000}>
                                 <div className="text-image">{item.Description}</div>
                             </Zoom>
                           </div>
                          </div>                         
                      
                         <div className="p-2 d-flex">
                         <button onClick={()=>this.setEnabled(i,item,userInfo.token)}  className={ item.Enabled? "w-100 flex-grow-1 btn buttonbg btn-lg":"w-100 flex-grow-1 btn buttonbg1 btn-lg"}>{item.Enabled? "Đang Bật":"Đang Tắt"}</button>
                         <button onClick={()=>window.confirm("Are you sure you wish to delete this item?")&& this.deleteHandler(item.Id,userInfo.token)} className="btn btn-link btn-lg" style={{color:'red'}}><i className="fas fa-trash-alt"></i>{' '}Delete</button>
                         </div>
                         
                        
                     </div>
                 ))}
                 </div>
             </div>
          
       </div>        
         </Fade>
         {newMenu && <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
         <button className="close-modal" onClick={this.closeModal}>x</button>            
               
                <form onSubmit={(e)=>this.onSubmit(e,userInfo.token)}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        {newMenu.Name ?<h3 style={{marginBottom:'0px'}} ><span style={{color:'orange'}}><i className="fas fa-edit"></i></span>{' '}Edit Menu</h3>:<h3 style={{marginBottom:'0px'}}><span style={{color:'orange'}}><i className="fas fa-edit"></i></span>{' '}New Menu</h3> }
                        </div>
                   
                    <div>
                    <button className="btn buttonbg1 btn-lg" onClick={()=>{this.setState({newMenu:null})}}><span style={{color:'orange'}}><i className="far fa-window-close"></i></span>{' '}Cancel</button> {'    '}
                    {uploading? <button type="submit" className="btn buttonbg btn-lg" disabled><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Menu</button>:
                    <button type="submit" className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Menu</button>
                    }
                     </div>
                    </div>
                  
                   <hr/>
                   <Fragment>
                    { errorupload && <div className="alert alert-warning">{errorupload}</div>}
                    { uploading && <div className="alert alert-warning">Uploading...</div>}
                   </Fragment>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" href="#desc" role="tab" data-toggle="tab">Description</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#content" role="tab" data-toggle="tab">Content</a>
                    </li>                   
                </ul>
                <div className="border-bottom border-left border-right">
                    <br></br>
                <div className="tab-content"style={{height:'62vh',overflowY:'auto'}}>
                     <div id="desc" role="tabpanel"  className="tab-pane active container">
                     <Zoom>    
                     <div className="form-group d-flex flex-column" >
                    <label >Avatar:</label> 
                    <Image Img={newMenu.Avatar} setImage={this.setAvatar} />   
                    {(errors && errors.Avatar)?  <small style={{color:'red'}}>{errors.Avatar}</small>:null}  
                    </div>    
                     <div className="form-group ">
                    <label htmlFor="Name">Name:</label>
                      <input
                       type="text" 
                       className={(errors && errors.Name)?"form-control form-control-lg is-invalid":"form-control form-control-lg"}
                       name="Name" 
                       id="Name"
                       value={newMenu.Name}
                       onChange={this.onChange1}
                       />   
                       {(errors && errors.Name)?  <small  style={{color:'red'}} >{errors.Name}</small>:null}                
                </div>
                
                <div className="form-group ">
                    <label htmlFor="Description">Description:</label>
                      <textarea
                       type="text" 
                       className={(errors && errors.Description)?"form-control form-control-lg is-invalid":"form-control form-control-lg"}
                       name="Description" 
                       id="Description"
                       value={newMenu.Description}
                       onChange={this.onChange1}
                       />    
                       {(errors && errors.Description)?  <small style={{color:'red'}}>{errors.Description}</small>:null}                
                </div>
                <div className="row">
                <div className="col-sm-6 form-group ">
                    <label htmlFor="Price">Price:</label>
                      <input
                       type="text" 
                       className={(errors && errors.Thoigian)?"form-control form-control-lg is-invalid":"form-control form-control-lg"}
                       name="Price" 
                       id="Price"
                       value={newMenu.Price}
                       onChange={this.onChange1}
                       />   
                       {(errors && errors.Price)?  <small  style={{color:'red'}} >{errors.Price}</small>:null}                
                </div>
                <div className="col-sm-6 form-group ">
                    <label htmlFor="Order">Order:</label>
                      <input
                       type="text" 
                       className={(errors && errors.Order)?"form-control form-control-lg is-invalid":"form-control form-control-lg"}
                       name="Order" 
                       id="Order"
                       value={newMenu.Order}
                       onChange={this.onChange1}
                       />    
                       {(errors && errors.Order)?  <small style={{color:'red'}}>{errors.Order}</small>:null}                
                </div>

                </div>
                
               
                
               
                </Zoom>
                     </div>
                     <div role="tabpanel" id="content"  className="tab-pane container ">
                         <Zoom>
                     <div className="form-group ">
                
                <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={newMenu.Content}
                    name="Content"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.onEditorChange(data);

                    } }
                   
                />
                
                   
                     {(errors && errors.Content)?  <small style={{color:'red'}}>{errors.Content}</small>:null}                
                </div>
                </Zoom>
                     </div>
                </div>                
                </div>
                <br></br>
                <div className="text-center">
                    <button className="btn buttonbg1 btn-lg" onClick={()=>{this.setState({newMenu:null})}}><span style={{color:'orange'}}><i className="far fa-window-close"></i></span>{' '}Cancel</button> {'    '}
                    {uploading? <button type="submit" className="btn buttonbg btn-lg" disabled><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Menu</button>:
                    <button type="submit" className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Menu</button>
                    }
                </div>
             </form>
                         
                      </Modal>}
          </div>
    }
}
export default Menu;