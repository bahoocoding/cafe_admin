import React,{Fragment} from 'react';
import animation from '../images/loading_image.gif';

const Loader=()=>(<Fragment>
  
  <img src={animation} style={{display:'block',margin:'auto',height:'20px',alignSelf:'center'}} alt="Loading"/>
  
</Fragment>
);



export default Loader