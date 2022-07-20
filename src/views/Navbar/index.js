// index.js

import React, { useState, useEffect, useRef } from 'react';

import {Users} from "../../server-api"
import {  Link, useLocation } from 'react-router-dom';
import './index.css'

import { BASE_COLOR } from '../../constants/style';


const Navbar = (props) => {

  const navWrapper=  useRef(null)
  const nav=  useRef(null)
  const location = useLocation();

  const [isLinksListOpen, openLinksList]= useState(false)

  const [user_id, setUserId] = useState(undefined);

  const [token, setToken] = useState(undefined);

  const [username, setusername] = useState(undefined);
  
  const [userRole, setUserRole]= useState(undefined)

  const [activeLink, setActiveLink]= useState( props.location ? props.location.pathname :null )

  const logout = async () => {
    
    try{
        let response = await Users.logout({user_id})

        let {data} = response

        if(data) {

            if(data.message === "LOGOUT_SUCCEEDED") {
          
                reset()

              window.open("/","_self") 

            }
            
        } else {
          
            if(response.response.data.message === "Unauthorized") {
                  reset()
                // props.history.push("/")
                  window.open("/","_self") 

            } else {

                alert('unhandeled error: details printed in developer tools console')
                
                console.log('unhandeled error', response.response.data)
              
            }
        }
      } catch (err) {
        console.log("logout failed", err)
      }

  }

  const onMenuClick= (e) => {
    
    if(navWrapper && navWrapper.current){
      openLinksList(!isLinksListOpen)
    }
  }

//   useEffect(() => {
    
//     const navbar = nav && nav.current ? nav.current : null

//     if(navbar) {
//       window.addEventListener('scroll', (event)=> {
//           // let elem=  document.querySelector('body')//event.srcElement.body
//           // console.log('scroll top', navbar.scrollHeight)
//           if(window.scrollY <= 20 ){
//             // navbar.removeClass('navbar-scroll');
//             navbar.classList.remove("navbar-scroll");
//             // alert(1)
//           } else {
//             // alert(2)
//             // navbar.addClass('navbar-scroll');
//             navbar.classList.add("navbar-scroll");
//           }
//       })

//       return () => window.removeEventListener("scroll", null)
//     }

// }, [navWrapper])

  useEffect(()=>{
  	 setToken( sessionStorage.getItem('AUTH_TOKEN') )
     setUserId(sessionStorage.getItem('USER_ID') )
     setusername(sessionStorage.getItem('USERNAME') )
     setUserRole(sessionStorage.getItem('ROLE') )
     setActiveLink(location.pathname)

  }, [location.pathname])
  
  const reset= () => {
    sessionStorage.setItem('AUTH_TOKEN', undefined)
    sessionStorage.setItem('USER_ID', undefined )
    sessionStorage.setItem('ROLE', undefined )
    sessionStorage.setItem('USERNAME', undefined )
  }

  let links = [

  ]

  const rightLinks= [
          // {name:"My Balance", url:"/balance"},
    // {name:"Dashboard", url:`/users/${user_id}/dashboard` },

    // {name:"Login", url:"/login" }, 
    // {name:"Logout", url:"/logout" },   

    // {name:"Register", url:"/register" },
  ]    
  
  if(!user_id || !token || user_id==="undefined" || token==="undefined" ) {

      rightLinks.push(
        {name:"Login", url:"/login" },
        //  {name:"Register", url:"/register" } 
      )


  } else if(user_id && token ) {
      rightLinks.push(
        // {name:"Balance", url:`/users/${user_id}/balance` }, 
        // {name:"Logout", onClick:()=>logout() } 
      )

      if(userRole==="SELLER") {
        links.push(
          {name:"My Products", url:`/products` },
          {name:"Dashboard", url:`/users/${user_id}` },
          {name:"Create Product", url:`/products/create` },
          {name:"Logout", onClick:()=>logout() }
        )
      } else { //BUYER
        
        links.push(
          {name:"Products", url:`/products`},
          {name:"Dashboard", url:`/users/${user_id}` },
          {name:"Logout", onClick:()=>logout() }

        )
      }

  } else {alert('unkown condition from navbar')}

  return(

    <header ref={nav} className="site-header">
      {/* <div className='nav-cover'></div> */}
      <div className="wrapper site-header__wrapper">
        <div className="site-header__start">
          <a href="/" className="brand">
            VENDING MACHINE
          </a>
          
        </div>
        <div className="site-header__middle">
          
          <nav className="nav">
            <button  
              onClick={onMenuClick} 
              className="nav__toggle"  
              aria-expanded={ isLinksListOpen ? false : true } 
              aria-label={ isLinksListOpen ? 'menu' : 'close menu' }
              type="button"
            >
              <i style={{color:BASE_COLOR}} className="fontello-icon">&#xe801;</i>
            </button>
            
            <ul ref={navWrapper} className={`nav__wrapper ${isLinksListOpen ? 'active' : ''}`}>

              {
                links.map((link, index) => {
                  if(link.url){
                    return(
                    <li key={index} className="nav__item">
                      <a href={link.url} className={link.url===activeLink ? "active-link": "" } >{link.name}</a>
                    </li>
                    )
                  } else {
                    return(
                      <li className="nav__item" key={index}>
                        <a className="" onClick={link.onClick || null } style={{margin:"auto 0.1em"}} key={index} href={link.url}>{link.name}</a>
                      </li>
                    )
                  }
                  
                })
              }
            </ul>
          </nav>
        </div>
        <div className="site-header__end">
          {/* <a className="button" href="#">Sign in</a> */}
          {
            rightLinks.map((link, index) => {

                return(
                  <a className="nav__item normal-link" onClick={link.onClick || null } style={{margin:"auto 0.1em"}} key={index} href={link.url}>{link.name}</a>
                )
              
            })
          }
        </div>
      </div>

      
    </header>
    

  )
}



export default Navbar


