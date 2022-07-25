import React, { useState } from "react";
import './index.css'
import CustomInput from '../../shared/CustomInput'
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
import { Products } from "../../../server-api";
import Helpers from '../../shared/Helpers.js'
import { BASE_COLOR } from "../../../constants/style";

const resolveError= Helpers.resolveError

const Create= ( props ) => {

    let [payload, setPayload]= useState({})
    
    let [error, setError] = useState(null)

    const handleChange= ({target}, key) => {

        let value = target.value
        
        setPayload({...payload, [key]:value})
    }
    
    const submit = async (releaseBtn) => {
        
        try {
            const response = await Products.create(payload)

            if(response.request.status===200 && response.data && response.data.product) {
        
                window.location.replace("/products/"+response.data.product._id)
        
            } else {

                if(response.request.status===400){
                    setError(response.response.data.error)
                } 
 
        
            }
            
            releaseBtn()
        
        } catch (error) {
        
            console.log("create product > error", error )
        
            releaseBtn()
        
        }
    }
    
    const nameError= resolveError('name', error )
    
    const costError= resolveError('cost', error) 

    const amountError= resolveError('availableAmount', error) 

    return (
        <div className="create-product-container" >
            {/* <h2>Create New Product</h2> */}
            <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900"}}>Create New Product</span>

            {error ? <span style={{color:"red", fontSize:"0.7em"}}> Error(s) below prevent(s) action completion.</span> : null}
            <CustomInput 
                placeholder={"text length between 3 & 30"}
                label="Product Name" 
                errorText={nameError} 
                onTextChange={(e)=>handleChange(e, 'name')} 
                style={{margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}

            />
            
            <CustomInput 
                placeholder={"an Integer number"}
                label="Product Amount" 
                errorText={amountError}  
                type={"number"} 
                onTextChange={(e)=>handleChange(e, 'availableAmount')}  
                style={{margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}

            />

            <CustomInput 
                placeholder={"an integer divisible by 5"}
                label="Product Cost"  
                errorText={costError}  
                type={"number"} 
                onTextChange={(e)=>handleChange(e, 'cost')}  
                style={{margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}

            />

            <ARB 
                onClick={submit} 
                 
                btnStyle={{
                    width:"16.4em", 
                    margin:"0.5em auto", 
                    backgroundColor:BASE_COLOR
                }} 
                
                label={<span style={{color:"#fff"}}>Submit</span>}
            />
        </div>
    )
}

export default Create