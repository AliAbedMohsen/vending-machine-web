import React, {useState, useEffect} from 'react'

import './index.css'

import BigLoader from '../shared/Loader/big'
import { Users, Ping } from '../../server-api'
import Deposit from './Deposit'
import { AsynchronousReactButton as ARB } from 'asynchronous-react-button'
export default (props) => {
    
    let [user, setUser] = useState({})
    
    let [isLoading, setIsLoading] = useState(true)
    
    const CurrentUserID = sessionStorage.getItem("USER_ID")
    
    const updateDeposit= (deposit) => {
       setUser({...user, deposit})
    }

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

    const test = async (releaseBtn)=> {
        
        try{
                   
            let response = await Ping.test()
            debugger
            if(response.data && response.data){

               
            } else {
                
                
                window.location.replace("/unexpected?s="+response.request.status)
            }
            releaseBtn()
        }catch(error){
            releaseBtn()
            // window.location.replace("/unexpected?e="+error)
        }  
    
        
    }

    const reset = async (releaseBtn)=> {
        
        try{
                   
            let response = await Users.withdraw()
            
            if(response.data && response.data){
               alert("Your deposit have reset.")
               
            }
            releaseBtn()
        }catch(error){
            releaseBtn()
            // window.location.replace("/unexpected?e="+error)
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
                    <div className='flex-row w-fill'>
                        <span 
                            style={{
                                width:"100%",
                                borderBottom:"1px solid #ccc",
                                textAlign:"center",
                                margin:"1em",
                                padding:"1em"
                            }}
                        >
                            Deposit: {" "+user.deposit+" Cents"}
                        </span>
                    </div>

                        <div className='role-options flex-row w-fill f-between wrap' >

                            <Deposit 
                                updateDeposit={updateDeposit} 
                                deposit={user.deposit} 
                            />

                            <ARB 
                                onClick={reset} 
                                label="Reset Deposit" 
                                btnStyle={{height:"4em", width:"8em", margin:"0.2em"}}
                                confirm={{
                                    message:"You are about to reset your deposit! Are you sure?",
                                    ok:"Yes",
                                    cancel:"No"
                                }}
                            />

                            <ARB 
                                onClick={test} 
                                label="test sessions" 
                                btnStyle={{height:"4em", width:"8em", margin:"0.2em"}}
                            />
                        </div> 
                    </div>


                </div>


            </div>
            
        )
    }

}

