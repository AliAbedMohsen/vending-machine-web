import React, { useState } from "react";
import './index.css'
import CustomInput from '../../shared/CustomInput'
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
import { Products } from "../../../server-api";
import Helpers from '../../shared/Helpers.js'

const resolveError= Helpers.resolveError

export default ( props ) => {

    let [payload, setPayload]= useState({})
    
    let [error, setError] = useState(null)

    const handleChange= ({target}, key) => {

        let value = target.value
        
        setPayload({...payload, [key]:value})
    }
    
    const submit = async (releaseBtn) => {
        
        try {
            const response = await Products.create(payload)

            if(response.data && response.data.product) {
        
                window.location.replace("/products/"+response.data.product._id)
        
            } else {
        
                setError(response.data.reason)
        
            }
            
            releaseBtn()
        
        } catch (error) {
        
            console.log("create product > error", error )
        
            releaseBtn()
        
        }
    }
    
    const nameError= resolveError('name', error )
    
    const costError= resolveError('cost', error) 

    const amountError= resolveError('amount', error) 

    return (
        <div className="create-product-container" >
            <CustomInput label="Product Name" errorText={nameError} onTextChange={(e)=>handleChange(e, 'name')} />
            
            <CustomInput label="Product Amount" errorText={amountError}  type={"number"} onTextChange={(e)=>handleChange(e, 'availableAmount')}  />

            <CustomInput label="Product Cost"  errorText={costError}  type={"number"} onTextChange={(e)=>handleChange(e, 'cost')}  />

            <ARB onClick={submit} label={"Submit"} />
        </div>
    )
}