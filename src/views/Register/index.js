import React, {useState} from 'react'

// import headerImg from './header-img.jpg'
// import ICON from './personal.png'
import './index.css'

import CustomInput from '../shared/CustomInput'

import CustomPicker from '../shared/CustomPicker'

import {AsynchronousReactButton as CustomButton} from 'asynchronous-react-button'

import {Users} from '../../server-api'

import Helpers from '../shared/Helpers.js'
import { BASE_COLOR } from '../../constants/style'


const resolveError= Helpers.resolveError

const Register = (props) => {
    
    let [error, setError] = useState(null)

    let [user_, setUser] = useState({})

    let [payload, setPayload] = useState({})


    const onAttributeChange = (value, key) => {
        
            setUser({...user_, [key]:value})

            setPayload({...payload, [key]:value})
    }

    const onSubmit = async (releaseBtn) => {
        
        try {
            
            let response = await Users.register(payload)
            debugger
            if(response && response.data ) {
                window.location.replace(`/login`)
            } else if(response.request.status===400) {
                setError(response.response.data.error)
            } else {
                alert("something went wrong!")
            }
        
            releaseBtn()


        } catch (err) {

            
           console.log('catched error in register > onSubmit ', err)  
           
           releaseBtn()

        }
        
    }


    const nameError= resolveError('username', error )
    
    const passwordError= resolveError('password', error)

    const roleError= resolveError('role', error) 


    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", paddingTop:"2%"}}>
            <div style={{ textAlign:"center"}}>
                {/* <span>VENDING MACHINE</span> */}
            </div>
            <div className="register-page-wrapper">


                <div className="icon-container">
	      
                    <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900"}}>Create New Account!</span>
            
                </div> 

                <div className="flex-col">
            
                    <CustomInput 
                        style={{width:"15em",  margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
                        placeholder={'pickup a username..'} 
                        errorText={nameError} 
                        onTextChange={(e) => onAttributeChange(e.target.value, 'username')} 
                        label={"Username"}
                        required
                        
                    />

                                
                    <CustomInput 
                    	style={{width:"15em",  margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
                        placeholder={'new secure password'} 
                        errorText={passwordError} 
                        onTextChange={(e) => onAttributeChange(e.target.value, 'password')} 
                        label={"Password"} 
                        type={"password"}
                        required 
                        
                    />

                    <CustomPicker 
                        placeholder={'Select role'} 
                        errorText={roleError} 
                        setPicked={(picked) => onAttributeChange(picked, 'role')} 
                        label={"Role"} 
                        items={[{id:'SELLER', title:"Seller"}, {id:'BUYER', title:"Buyer"}]}  
                        parentsSelectable= {true}
                        titleKey={'title'} 
                        idKey={'id'}
                        pickerStyle={{ borderStyle:"none",outline:"none", backgroundColor:"#fff"}}
                        fieldsetStyle={{borderStyle:"solid"}}
                        containerClass={'custom-picker-container'}
                        containerStyle={{width:"15em", margin:"auto"}}
                        pickedItemId={ user_  && user_.role ? user_.role : '' }
                        disabled={false}
                        required
                    />


                    
                    <span  style={{color:"red", fontSize:"0.8em", margin:"1em auto", padding:"0.5em", width:"100%", textAlign:"left", borderTop:"1px solid #777"}}>
                       {"*= Required field."} 
                       {/* * Required field. */}
                    </span>

                    <CustomButton 

                        btnStyle={{
                            width:"17.5em", 
                            margin:"0.5em auto", 
                            backgroundColor:BASE_COLOR
                        }} 
                        label={<span style={{color:"#fff"}}>Create Account</span>}
                        loader={"Loading..."}
                        onClick={onSubmit} 
                         
                        
                    />
            
                </div>  
            </div>
        </div>
    )

}

export default  Register