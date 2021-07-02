import React from 'react';
import Modal from 'react-modal';
import animation from '../images/loading_image.gif';

const Loader1=(props)=> <Modal className="container"isOpen={props.show} ariaHideApp={false} >
<div className="d-flex flex-column justify-content-center" style={{height:'85vh'}}>
<img className="p-2"src={animation} style={{display:'block',margin:'auto',height:'100px',alignSelf:'center'}} alt="Loading"/>
</div>
</Modal>
 
export default Loader1