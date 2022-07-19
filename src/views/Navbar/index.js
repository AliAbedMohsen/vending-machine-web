// index.js

import React, { useState, useEffect, useRef } from 'react';

import {Users} from "../../server-api"
import {  Link, useLocation } from 'react-router-dom';
import logo from './logo.png'

const Navbar = (props) => {

  const location = useLocation();

  const [user_id, setUserID] = useState(undefined);

  const [token, setToken] = useState(undefined);

  const [username, setUsername] = useState(undefined);
  
  const logout = async () => {
    
    let response = await Users.logout()

    let {data} = response

    if(data) {

        if(data.message === "LOGEDOUT") {
		  
		  localStorage.setItem('AUTH_TOKEN', undefined)
		  localStorage.setItem('USER_ID', undefined )

		  window.open("/","_self") 

        }
        
    } else {
       
        if(response.response.data.message === "Unauthorized") {
             
             // props.history.push("/")
              window.open("/","_self") 

        } else {

            alert('unhandeled error: details printed in developer tools console')
            
            console.log('unhandeled error', response.response.data)
          
        }
    }

  }

  useEffect(()=>{
  	 setToken( sessionStorage.getItem('AUTH_TOKEN') )
     setUserID(sessionStorage.getItem('USER_ID') )
     setUsername(sessionStorage.getItem('USERNAME') )

  }, [location.pathname])

  return(
    
		<header className="site-header">
		      <div className="wrapper site-header__wrapper">
		        <div className="site-header__start">

		          <a href="#" className="brand"> VENDING MACHINE</a>
		          
		        </div>
		        <div className="site-header__mid">
			          <ul className="sub-nav">

			            {   
			            	props.routes ? props.routes.map((r, index)=>{
				            		return(
		                              <li key={index}>
		                                <a href={r.url}  >{r.name}</a>
		                              </li>

				            		)
				            	})
				            : []
			            }			            

			          </ul>
		        </div>

		        <div className="site-header__end">
                   <ul className="sub-nav">

                      {
                        token && token !== 'undefined' && user_id && user_id !== 'undefined'  ? <li><span >{`Welcome ${username}!`}</span></li> : null

                      }
                      
                      {
                      	props.rightLinks.map((link, index) => {
                      		return(
                                <li key={index}>
                                   <a href={link.url}  >{link.name}</a>
                                </li>
                      		)
                      	})
                      }



                      {
                        token && token !== 'undefined' && user_id && user_id !== 'undefined'  ? <li><a href={`/users/${user_id}`}>Account</a></li> : null

                      }

                      {
                        token && token !== 'undefined' && user_id && user_id !== 'undefined'  ? <li><button onClick={logout}>Logout</button></li> : null
                      }
                      
                   </ul>
		        </div>
		      </div>
		</header>
    
  )
}

export default Navbar


