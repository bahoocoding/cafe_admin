import React,{Component,Fragment} from 'react';

class Image extends Component{
    constructor(props){
        super(props);
        this.state={           
            img:''
        }
        this.inputOpenFileRef = React.createRef()
       
    }
    
    onImageClick=()=>{
        this.inputOpenFileRef.current.click()
    }
    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    onChange=e=>{
        this.setState({file:e.target.files[0],filepath:URL.createObjectURL(e.target.files[0])}); 
         this.getBase64(e.target.files[0],(file)=>{          
            this.props.setImage(file)
            this.setState({img:file}) 
        });

    }      
    
   
    render(){
        const {img}=this.state; 
        const Img=this.props.Img       
        return <Fragment>        
            <img  className="p-2"  style={{height:'50px',cursor:'pointer',borderRadius:'1rem',alignSelf:'center'}}src={img?img:Img? Img:"/uploads/add-image.png"}  onClick={this.onImageClick} alt=""/>
            <input type='file' id='file' name="picture" onChange={(e)=>this.onChange(e)} ref={this.inputOpenFileRef} style={{display: 'none'}} accept="image/*"/>
            </Fragment> 
        
    }
}
export default Image