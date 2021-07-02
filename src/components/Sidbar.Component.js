
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.wrapperRef = React.createRef()
    }
componentDidMount=()=>{
    document.querySelector('.main').addEventListener('click', this.handleClick)
}
componentWillUnmount(){
    document.querySelector('.main').removeEventListener('click', this.handleClick)
}
    closeMenu=()=>{
        this.props.closeMenu();
    }

    handleClick = (event) => {
        const { target } = event
        if (!(target.id ==="menu_button")&&!this.wrapperRef.current.contains(target) ) {
         this.closeMenu();
        }
      if (target.id==="menu_button"){
          alert("bam dung")
      }
        }
    render(){

return <aside ref={this.wrapperRef} className="sidebar" >
        
               <h1 style={{color:'orange'}}>Dashboard</h1>
               <div className="close-menu-button" onClick={this.closeMenu}>x</div>
               <hr></hr>
               <ul className="nav flex-column">
                   <li className="nav-item">
                       <Link className="nav-link active" to={'/admin/config'} onClick={this.closeMenu}><i className="fas fa-cogs"></i>{' ' } General Setting</Link>
                   </li>
                   <li className="nav-item">
                    <Link className="nav-link" to={'/admin/users'} onClick={this.closeMenu}><i className="fas fa-users"></i>{' ' } Users</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/admin/menus'} onClick={this.closeMenu}><i className="fas fa-newspaper"></i>{' ' } Menus</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/admin/services'} onClick={this.closeMenu}><i className="fas fa-newspaper"></i>{' ' } services</Link>
                    </li>
                    
                   
               </ul>
              
        </aside>

}
}
export default Sidebar;