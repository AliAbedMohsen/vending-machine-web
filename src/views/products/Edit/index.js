import React, { useState, useEffect } from "react";
import './index.css'
import CustomInput from '../../shared/CustomInput'
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
import { Products } from "../../../server-api";
import Helpers from '../../shared/Helpers.js'
import BigLoader from '../../shared/Loader/big'
import { BASE_COLOR } from "../../../constants/style";

const resolveError= Helpers.resolveError

const Edit = ( props ) => {
    let pid = props.match.params.pid

    let [payload, setPayload]= useState({})

    let [isLoading, setIsLoading] = useState(true) 
    
    let [product, setProduct] = useState({}) 

    let [error, setError] = useState(null)

    const handleChange= ({target}, key) => {

        let value = target.value
        
        setPayload({...payload, [key]:value})
    }
    
    const fetchProduct = async () => {
        
        
        try {
            const response = await Products.product({pid})
            
            if(response.data) {
                setProduct(response.data.product)
            }
            
            setIsLoading(false)      

        } catch (error) {
           
            setIsLoading(false)
           
            console.log('fetchProduct > error', error)
            alert("something went wrong!")
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
    
    useEffect(()=>{fetchProduct()}, [])

    if(isLoading){
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {    
        const nameError= resolveError('name', error )
    
        const costError= resolveError('cost', error) 

        const amountError= resolveError('availableAmount', error) 

        return (
            <div className="edit-product-container" >
                {/* <h2>Edit Product</h2> */}
                <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900"}}> Edit Product</span>

                {error ? <span style={{color:"red", fontSize:"0.7em"}}> Error(s) below prevent(s) action completion.</span> : null}

                <CustomInput 
                    placeholder={"text length between 3 & 30"}
                    defaultValue={product.name} 
                    label="Product Name" 
                    errorText={nameError} 
                    onTextChange={(e)=>handleChange(e, 'name')} 
                    style={{ margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
                    />
                
                <CustomInput 
                    placeholder={"an Integer number"}
                    style={{  margin:"0.5em auto", border:`1px solid ${BASE_COLOR}`}}
                    defaultValue={product.availableAmount} 
                    label="Product Amount" 
                    errorText={amountError}  
                    type={"number"} onTextChange={(e)=>handleChange(e, 'availableAmount')}  
                    
                />

                <CustomInput 
                    placeholder={"an integer devisable by 5"}
                    defaultValue={product.cost} 
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
                    label={<span style={{color:"#fff"}}>Save Changes</span>}
                />
                <div className="flex-row w-fill" style={{borderTop:"1px solid #ccc", padding:"1em"}}>
                     <a className="custom-button" href={`/products/${pid}`} >Back</a>
                </div>
            </div>
        )
    }
}

export default Edit