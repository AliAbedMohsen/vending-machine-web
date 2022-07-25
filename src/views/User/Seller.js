import React, {useState, useEffect} from 'react'

import './index.css'

import BigLoader from '../shared/Loader/big'
import { Users } from '../../server-api'

const Seller= (props) => {
    
    let [user, setUser] = useState({})
    
    let [isLoading, setIsLoading] = useState(true)
        
    const getResources = async ()=> {
        
        try{
            
            let id = props.match.params.id
       
            let response = await Users.user({id})
            
            if(response.data){

                
                setUser(response.data.user)
                setIsLoading(false)
            } 

            
        }catch(error){
            
            alert("something went wrong!")
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

            <div className="dashboard-page-wrapper ">
                <h2>User Dashboard</h2>
                <div className='flex-col'>
                    <span>
                        {`Hey ${user.username}! Here are the available actions for you as a ${user.role.toLowerCase()}.`}
                    </span>
                    <div className='flex-col w-fill f-start' style={{alignItems:"center", margin:"2em"}} >

                        <div className='role-options flex-row w-fill f-around wrap' >

                            <a className="custom-button" href={"/products/create"}>Add New Product</a>
                            <a className="custom-button" href={`/users/${user._id}/products`}>My Products</a>
                        </div> 
                    </div>


                </div>


            </div>
            
        )
    }

}

export default Seller