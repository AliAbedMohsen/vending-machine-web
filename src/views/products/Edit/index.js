import React, { useState, useEffect } from "react";
import './index.css'
import CustomInput from '../../shared/CustomInput'
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
import { Products } from "../../../server-api";
import Helpers from '../../shared/Helpers.js'
import BigLoader from '../../shared/Loader/big'

const resolveError= Helpers.resolveError

export default ( props ) => {

    let [payload, setPayload]= useState({})

    let [isLoading, setIsLoading] = useState(true) 
    
    let [product, setProduct] = useState({}) 

    let [error, setError] = useState(null)

    const handleChange= ({target}, key) => {

        let value = target.value
        
        setPayload({...payload, [key]:value})
    }
    
    const fetchProduct = async () => {
        
        let pid = props.match.params.pid
        
        try {
            const response = await Products.product({pid})
            
            if(response.data) {
                setProduct(response.data.product)
            } else {
              // redirect
              alert()
            }  
            
            setIsLoading(false)      

        } catch (error) {
           
            setIsLoading(false)
           
            console.log('fetchProduct > error', error)
        } 

    }
    

    const submit = async (releaseBtn) => {
        
        try {
            let pid = props.match.params.pid
            let uid = props.match.params.id
            const response = await Products.update( {uid, pid}, payload )

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
    
    useEffect(()=>{fetchProduct()}, [])

    if(isLoading){
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {    
        const nameError= resolveError('name', error )
    
        const costError= resolveError('cost', error) 

        const amountError= resolveError('amount', error) 

        return (
            <div className="edit-product-container" >
                <h2>Edit Product</h2>
                <CustomInput defaultValue={product.name} label="Product Name" errorText={nameError} onTextChange={(e)=>handleChange(e, 'name')} />
                
                <CustomInput defaultValue={product.availableAmount} label="Product Amount" errorText={amountError}  type={"number"} onTextChange={(e)=>handleChange(e, 'availableAmount')}  />

                <CustomInput defaultValue={product.cost} label="Product Cost"  errorText={costError}  type={"number"} onTextChange={(e)=>handleChange(e, 'cost')}  />

                <ARB onClick={submit} label={"Save Changes"} />
            </div>
        )
    }
}