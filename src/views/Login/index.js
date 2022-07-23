
// index.js

import react, {useState} from 'react'

import  './index.css'

// import key from './key-ltr.png'
// import key from './login-logo.png'

import {Users} from '../../server-api'

import {AsynchronousReactButton as CustomButton} from 'asynchronous-react-button'

import CustomInput from '../shared/CustomInput';

import Helpers from '../shared/Helpers.js'

import { BASE_COLOR } from '../../constants/style'

// import LOGO_DARK from '../Navbar/logo-light-4.png'
// import LOGO_DARK from '../Navbar/ashtaghil-no-bg.png'

// import LOCK from './lock1.png'


const resolveError= Helpers.resolveError

const Login= ( props ) => {

	let [error, setError] = useState(null)

    const [credencials, setCredencials] = useState({})
    
    const [loginError, setLoginError] = useState(null)

    const login = async (releaseBtn) => {
        
		setLoginError(null)
		
    
		try{
           
           let response = await Users.login(credencials)
           
           let {data, message } = response
           
           if(data){
              
                const {token, user, message, multiActiveSessions}= data
                
                if(user && token){


					sessionStorage.setItem('USER_ID', user._id)
					
					sessionStorage.setItem('ROLE', user.role)
                    
                    sessionStorage.setItem('USERNAME', user.username)

					sessionStorage.setItem('AUTH_TOKEN', token)
					

	                releaseBtn()
                    
					if(multiActiveSessions) {
                     debugger
					}

					window.location.replace("/users/"+user._id)


	            } else {

                    setLoginError(message)
					
					releaseBtn()
	            
	            }

           } else {
           
			    setLoginError(message)
				
				releaseBtn()

           }

        } catch (err) {
           
        	// setLoginError(err)
            releaseBtn()
        	console.log("error exception on LoginPage > login ", err)
        }


    }

    const onTextInputChange = ( value, key ) => {
      
      setCredencials({...credencials, [key]:value })
    
    }

	return( 
        
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", paddingTop:"2%"}}>

	        <div className="flex-col main-login-container">
	            
	           <div className="logo-container">
	      
	               {/* <img src={LOCK} /> */}
	      
	           </div> 

	           <div className="title-container">
	               
	               <span style={{color:BASE_COLOR, borderBottom:"1px solid #000"}}>
					   Login
				   </span>
	           </div>
			   <span style={{fontSize:"0.8em", color:"red", height:"30px"}}>{loginError}</span>

	           <div className=" flex-col">
	               
				    <CustomInput 
					    style={{width:"14.5em",  margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
						placeholder={'your username..'} 
						errorText={resolveError('username', error)} 
						onTextChange={(e) => onTextInputChange(e.target.value, 'username')} 
						label={"Username"}
						
						required
                    />
					<CustomInput 
					    style={{width:"14.5em", margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
						placeholder={"you password..."} 
						errorText={resolveError('password', error)} 
						onTextChange={(e) => onTextInputChange(e.target.value, 'password')} 
						label={"Password"}
						type={"password"}  
						required
					/>
                     
					<CustomButton 
					    
						btnStyle={{
							width:"17.5em", 
							margin:"0.5em auto", 
							backgroundColor:BASE_COLOR
						}} 

						onClick={login}  
						label={<span style={{color:"#fff"}}>Login</span>}
						loader={"Loading..."}
					/>
					
					{/* <a className="nav-links" href="/reset_password">
					{"Forgot password?"}
						
					</a> */}
					<a className="nav-links" href="/register">
						
						{"Don't have an account? Create new one."}
					</a>

	           </div>
	           

	        </div>
	    
	    </div>


	)

} 

export default Login

