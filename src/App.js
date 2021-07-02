import React,{Component} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";



import Admin from "./components/Admin.Component";
import Home from "./components/Home.Component";
import Letan from "./components/letan/Letan.Component";

import Notfound from "./components/Notfound.Component";
class App extends Component {
constructor(props){
  super(props);
  this.state={
   
  }
  this._isMouted=false;
}

  render(){
    
  return (
    <BrowserRouter>    
    <Switch>
    <Route exact={true} path='/admin' component={()=><Admin />}/>
    <Route exact={true} path='/letan' component={()=><Letan />}/>
    <Route exact path='/' component={()=><Home />} />
     <Route component={Notfound}/> 

    
     </Switch>
   
    </BrowserRouter>
  );
}
}

export default App;
