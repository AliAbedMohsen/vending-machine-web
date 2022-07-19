// import logo from './logo.svg';
// import './App.css';

import './navbar.css'
import React from 'react'
import Navbar from './views/Navbar'
import Footer from './views/footer'
import User from './views/User'
import Login from './views/Login'
import Register from './views/Register'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "./App.css"

function App() {
  
    let routes= [
		
      {name:"Login", url:"/login", component:Login },  

      {name:"Register", url:"/register", component:Register},

      {name:"User", url:"/users/:id", component:User},

    ]
   
    
	return (

	    <div className="App"  >
		
	       <Router>
	    
            {/* <Navbar routes={routes} /> */}
            <div style={{height:"100%"}}>
              <Switch>
            
                {   
                  routes.map((link, index)=>{
                        
                      return(
                            
                            <Route exact path={link.url} component={link.component} />

                      )
                    
                    })
                    
                }

              <Route path="/404" component={GenericNotFound} />
              
            
              </Switch>
            </div>  
	       </Router>
	       <Footer />
	    </div>

	)
}

const GenericNotFound = () => <span style={{padding:"30px"}}>Resource Not Found!</span>


export default App;
