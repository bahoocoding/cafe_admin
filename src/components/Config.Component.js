import React,{Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import Image from '../components/Image.Component';
import Loading from './Loading.Component';
import Loading1 from './Loading1.Component';
import Zoom from 'react-reveal/Zoom';
import {editorConfiguration,server} from '../config';
import InfoMessage from '../components/InfoMessage.Component';

class Config extends Component{
     constructor(props){
         super(props);
         this.state={
             config:null,
             isloading:true,
             loading:false,
             error:'',
             errors:'',             
             Logo:'',
             Avatar:'',
             file:'',
             LogoImg:'',
             AvatarImg:'',
             msg:''
         }
       this._isMouted=false;
       this.onChange =this.onChange.bind(this);
       this.submitHandler=this.submitHandler.bind(this);
       this.onChange1=this.onChange1.bind(this);
     }
     componentDidMount= async()=>{
        this._isMouted=true;
        document.title="General Setting";
        this._isMouted&&await Axios.get(server+"/configs"
        ).then(
            async(res)=>{
             this._isMouted && this.setState({config:res.data})      
           
           this._isMouted&&this.setState({isloading:false})                
            },err=>{
                this.setState({error:err});
            }
        );  
     }
     componentWillUnmount(){
        this._isMouted=false;
     }     
    submitHandler=async(e,token)=>{
         e.preventDefault();
         const config=this.state.config 
         this.setState({loading:true})        
        await Axios.post(server+"/configs",{Company_Name:config.Company_Name,Company_Phone:config.Company_Phone,Company_Email:config.Company_Email,
        Company_Logo:config.Company_Logo,Company_Slogen:config.Company_Slogen,Company_Avatar:config.Company_Avatar,Company_Description:config.Company_Description,
        Company_Mission:config.Company_Mission,Company_Vision:config.Company_Vision,Company_About:config.Company_About,Company_Address:config.Company_Address,
        Company_Lat:config.Company_Lat,Company_Long:config.Company_Long,Googlemap_Key:config.Googlemap_Key
        },{
             headers:{                
                    authorization:'Bearer '+token                                                               
             }
         }).then(
             res=>{
                 
               this.setState({loading:false,msg:res.data.msg})
             },
             err=>{
           
                this.setState({error:err.response.data.error}) 
             }
         );
         
        
    }
    
    onChange(e){
        this.setState(prevState=>({config:{...prevState.config,[e.target.name]:e.target.value}}));
        
    }
    onChange1=e=>{
        this.fileToDataUri(e.target.files[0])
            .then(dataUri => {
                this.setState({file:dataUri});
             
            })   
       
  }
   setLogo=(src)=>{     
    
       this.setState(prevState=>({config:{...prevState.config,Company_Logo:src}}));
   }
   setAvatar=(src)=>{  
   this.setState(prevState=>({config:{...prevState.config,Company_Avatar:src}}));
   }
   onEditorChange=(data)=>{
    this.setState(prevState=>({config:{...prevState.config,Company_About:data}}));
      
   }
    render(){
        const {isloading,config,error,errors,msg,loading}=this.state;
        
        const {userInfo} =this.props.userSignin;
   
        if (!userInfo){
            return <Redirect to='/signin'/>
        }
        return isloading? <Loading1 show={isloading} />:config&&<div className="container">
            <br></br>  
              
            <form onSubmit={(e)=>this.submitHandler(e,userInfo.token)} >
            <div className="d-flex justify-content-between">
            <h2 className="d-none d-sm-block" style={{marginBottom:'0px'}}><span style={{color:'orange'}}><i className="fas fa-th-large"></i></span>{' '}General Setting</h2> 
            {loading? <button type="submit" className="btn buttonbg btn-lg" disabled ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Setting</button>:
                    <button type="submit" className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Setting</button>}  
             </div>
            <hr/>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" href="#infor" role="tab" data-toggle="tab">Contact Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#description" role="tab" data-toggle="tab">Description</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#about" role="tab" data-toggle="tab">About</a>
                </li>
            </ul>
          
           
            <div className="border-bottom border-left border-right">
           <br></br>
            <div className="tab-content"style={{height:'62vh',overflowY:'auto'}}>
            {msg && <InfoMessage kieu={"alert alert-success"} show={true} message={msg}/>}
            {error && <InfoMessage kieu={"alert alert-warning"} show={true} message={error} />}
               {loading && <Loading1 show={loading} />}
               
               <div id="infor" role="tabpanel"  className="tab-pane active container">           
             <Zoom>
               
              <div className="form-group ">
              <label htmlFor="Company_Name">
                        Name:
                    </label>
                    <input
                     type="text" 
                     className={errors && errors.Company_Name? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                     name="Company_Name" 
                     id="Company_Name"
                     value={config.Company_Name}
                     onChange={this.onChange}
                     />

                    {errors && errors.Company_Name && <small className="invalid-feedback">{errors.Company_Name}</small>}
              </div>
              <div className="row" style={{padding:'1rem'}}>
              <div className="col-sm-3 p-2 form-group border d-flex flex-column text-center" style={{borderRadius:'1rem'}}>                                  
                   <Image Img={config.Company_Logo} setImage={this.setLogo} />                 
                   <label >Company_Logo:</label>
                </div>
                <div className="col-sm-3 p-2 form-group">
                    <label  htmlFor="Company_Phone">Phone:</label>
                    <input 
                    type="text" 
                    className={errors && errors.Company_Phone? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="Company_Phone" 
                    name="Company_Phone"
                    value={config.Company_Phone}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.Company_Phone && <small className="invalid-feedback">{errors.Company_Phone}</small>}
                </div>
                <div className="col-sm-3 p-2 form-group">
                    <label  htmlFor="Company_Lat">Latitude:</label>
                    <input 
                    type="text" 
                    className={errors && errors.Company_Phone? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="Company_Lat" 
                    name="Company_Lat"
                    value={config.Company_Lat}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.Company_Phone && <small className="invalid-feedback">{errors.Company_Phone}</small>}
                </div>
                <div className=" col-sm-3 p-2 form-group">
                    <label  htmlFor="Company_Long">Longtitude:</label>
                    <input 
                    type="text" 
                    className={errors && errors.Company_Phone? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="Company_Long" 
                    name="Company_Long"
                    value={config.Company_Long}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.Company_Phone && <small className="invalid-feedback">{errors.Company_Phone}</small>}
                </div>
              </div>
                              
                <div className="form-group">
                    <label htmlFor="Company_Email">Email:</label>
                    <input 
                    type="text" 
                    className={errors && errors.Company_Email? "form-control form-control-lg is-invalid":"form-control form-control-lg"}
                    id="Company_Email" 
                    name="Company_Email"
                    value={config.Company_Email}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.Company_Email && <small className="invalid-feedback">{errors.Company_Email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="Company_Address">Address:</label>
                    <textarea 
                    type="text" 
                    className="form-control form-control-lg"
                    id="Company_Address" 
                    name="Company_Address"
                    value={config.Company_Address}
                    onChange={this.onChange}>

                     </textarea>
                    {errors && errors.Company_Address && <small className="invalid-feedback">{errors.Company_Address}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="Googlemap_Key">Google Map Key:</label>
                    <input
                    type="text" 
                    className="form-control form-control-lg"
                    id="Googlemap_Key" 
                    name="Googlemap_Key"
                    value={config.Googlemap_Key}
                    onChange={this.onChange}>

                     </input>
                    {errors && errors.Company_Address && <small className="invalid-feedback">{errors.Company_Address}</small>}
                </div>
                
         
                </Zoom>
            </div>
            <div role="tabpanel" id="description"  className="tab-pane container ">
                <Zoom>
                
                <div className="row" style={{padding:'1rem'}}> 
                <div className="col-sm-4 p-2 form-group border d-flex flex-column text-center" style={{borderRadius:'1rem'}}>
                   <Image Img={config.Company_Avatar} setImage={this.setAvatar} />   
                   <label className="d-none d-md-block">Avatar</label> 
                </div>
                <div className="col-sm-8 p-2 form-group" >
                    <label htmlFor="Company_Slogen">Slogen:</label>
                    <textarea 
                    type="text" 
                    className="form-control form-control-lg"
                    id="Company_Slogen" 
                    name="Company_Slogen"
                    value={config.Company_Slogen}
                    onChange={this.onChange}>

                     </textarea>
                    {errors && errors.Company_Slogen && <small className="invalid-feedback">{errors.Company_Slogen}</small>}
                </div>
                
                </div>
                <div className="form-group">
                    <label htmlFor="Company_Description">Description:</label>
                    <textarea
                    type="text"                   
                    className="form-control form-control-lg"
                    id="Company_Description" 
                    name="Company_Description"
                    value={config.Company_Description}
                    onChange={this.onChange}>

                     </textarea>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="Company_Mission">Mission:</label>
                    <textarea
                    type="text"                   
                    className="form-control form-control-lg"
                    id="Company_Mission" 
                    name="Company_Mission"
                    value={config.Company_Mission}
                    onChange={this.onChange}>

                     </textarea>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="Company_Vision">Vision:</label>
                    <textarea
                    type="text"                   
                    className="form-control form-control-lg"
                    id="Company_Vision" 
                    name="Company_Vision"
                    value={config.Company_Vision}
                    onChange={this.onChange}>

                     </textarea>
                   
                </div>
                </Zoom>
            </div>
            
            <div role="tabpanel" id="about" className="tab-pane container ">
              <Zoom>
            <div className="form-group">
                  
                   
            <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data={config.Company_About}
                    name="Company_About"
                    id="Company_About"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.onEditorChange(data);

                    } }
                   
                />
                
                </div>
                </Zoom>
            </div>
            </div>
           
        </div>
       
        <div className="text-center" style={{marginTop:'1rem'}}>              
                    {isloading? <button type="submit" className="btn buttonbg btn-lg" disabled ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Setting</button>:
                    <button type="submit" className="btn buttonbg btn-lg" ><span style={{color:'orange'}}><i className="far fa-save"></i></span>{' '}Save Setting</button>}
                                      
             </div>
        </form>
        </div>
        
                
    }
}
export default Config;