import React, {useState, useEffect} from 'react'

import './index.css'

import BigLoader from '../shared/Loader/big'
import { Users } from '../../server-api'

export default (props) => {
    
    let [user, setUser] = useState({})
    
    let [isLoading, setIsLoading] = useState(true)
    
    const CurrentUserID = sessionStorage.getItem("USER_ID")
    
    const getResources = async ()=> {
        
        try{
            
            let id = props.match.params.id
       
            let response = await Users.user({id})
            if(response.data){
                let data= response.data
                
                let _user= data.user
                
                setUser(_user)
                
                setIsLoading(false)
            } else {
                debugger
                console.log(response.response.data)
            }
            
        }catch(e){
            
            alert('error from new user --> callApi')
        }  
    
        
    }

    useEffect(()=>{
        
        getResources()    
    
    }, [])
        
    if(isLoading){
      
        return(
             <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
        )
    } else {
        
        return(

            <div className="profile-page-wrapper ">
            
                <div className='profile-responsive-layout'>
                    <div className='flex-col f-start' style={{alignItems:"center", margin:"auto 1em"}} >

                    </div>
                    <div className='flex-col' style={{alignItems:"flex-start", justifyContent:"center", width:"inherit"}}>
                        <div className='flex-row w-fill'>
                        </div>


                    </div>


                </div>


            </div>
            
        )
    }

}

