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
            if(response.data && response.data){

                
                setUser(response.data.user)
                
                setIsLoading(false)
            } else {
                
                
                window.location.replace("/unexpected?s="+response.request.status)
            }
            
        }catch(error){
            
            window.location.replace("/unexpected?e="+error)
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
                <h2>User Dashboard</h2>
                <div className='profile-responsive-layout'>
                <div className='flex-row center'>{`Hey ${user.username}! Here are the available actions for you as a ${user.role.toLowerCase()}.`}</div>
                    <div className='flex-col f-start' style={{alignItems:"center", margin:"auto 1em"}} >
                        <div className='flex-row f-between'>
                            <a href={"/products/create"}>Add New Product</a>
                            <a href={`/users/${user._id}/products`}>My Products</a>
                        </div> 
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

