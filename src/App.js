// import logo from './logo.svg';
// import './App.css';

import React from 'react'
import Navbar from './views/Navbar'
import Footer from './views/footer'
import User from './views/User'
import Login from './views/Login'
import Register from './views/Register'
import Product from './views/products/Product'
import Products from "./views/products"
import MyProducts from "./views/products/MyProducts"
import EditProduct from "./views/products/Edit"
import CreateProduct from "./views/products/Create"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "./App.css"

function App() {
  
    let routes= [
		
      {name:"Login", url:"/login", component:Login },  

      {name:"Register", url:"/register", component:Register},

      {name:"User", url:"/users/:id", component:User},

      {name:"Products", url:"/", component:Products},

      {name:"Products", url:"/products", component:Products},

      {name:"Create Product", url:"/products/create", component:CreateProduct},

      {name:"Product", url:"/products/:id", component:Product},

      {name:"My Products", url:"/users/:id/products", component:MyProducts},

      {name:"Edit Product", url:"/users/:id/products/:pid/edit", component:EditProduct},

    ]
   
    
	return (

	    <div className="App"  >
		
	       <Router>
	    
            <Navbar routes={routes} />
            <div style={{height:"inherit", paddingBottom:"100px"}}>
              <div className='page-wrapper'>
              <Switch>
            
                {   
                  routes.map((link, index)=>{
                        
                      return(
                            
                            <Route key={index} exact path={link.url} component={link.component} />

                      )
                    
                    })
                    
                }
              <Route path="/500" component={ServerError} />
              <Route path="/403" component={Unauthorized} />
              <Route path="/404" component={GenericNotFound} />
              <Route path="*" component={GenericNotFound} />
              </Switch>
              </div>
            </div>  
	       </Router>
	       <Footer />
	    </div>

	)
}

const GenericNotFound = () => <span style={{padding:"30px"}}>Resource Not Found! Code 404.</span>
const Unauthorized = () => <span style={{padding:"30px"}}>You are not authorized to do this action! Code 403.</span>
const ServerError = () => <span style={{padding:"30px"}}>Internal server error with code 500.</span>

export default App;
