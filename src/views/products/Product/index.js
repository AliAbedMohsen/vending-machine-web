import React, { useEffect, useState } from "react";
import './index.css'
import BigLoader from '../../shared/Loader/big'
import { Products } from "../../../server-api";
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
export default ( props ) => {
    

    let [isLoading, setIsLoading] = useState(true) 
    let [product, setProduct] = useState({}) 
    
    const fetchProduct = async () => {
        
        let pid = props.match.params.id
        
        try {
            
            const response = await Products.product({pid})
            
            if(response.data && response.data.product ) {
                
                setProduct(response.data.product)

            } else {
              // redirect
               window.location.replace("/404")
            }  
            
            setIsLoading(false)      

        } catch (error) {
           
            setIsLoading(false)
           
            console.log('fetchProduct > error', error)
        } 

    }
    
    const deleteProduct= async (releaseBtn) => {
        try {
        
            let pid = props.match.params.id

            let response= await Products.delete({pid})
            
            if(response.data && response.data.message==="DELETED"){
             window.location.replace("/")
            }

            releaseBtn()
        
        } catch (error) {

            releaseBtn()

            console.log("delete prodect error", error)
        }

    } 

    useEffect(()=>{fetchProduct()}, [])

    if(isLoading){
    
        <div style={{height:"17em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {
    
        return(
            <div className="flex-col">
                <h2>Product Details</h2>
                <div className="flex-row f-between" style={{width:"17em"}}>
                    <span>Product Name:</span>
                    <span>{product.name}</span>
                </div>

                <div className="flex-row f-between" style={{width:"17em"}}>
                    <span>Product Cost:</span>
                    <span>{product.cost+" Cents"}</span>
                </div>

                <div className="flex-row f-between" style={{width:"17em"}}>
                    <span>Available Amount:</span>
                    <span>{product.availableAmount}</span>
                </div>

                <div className="flex-row f-between" style={{width:"17em"}}>
                    <span>Added at:</span>
                    <span>{product.created_at}</span>
                </div>

                <div className="flex-row f-between" style={{width:"17em"}}>
                    <span>Seller :</span>
                    <span>{product.seller.username}</span>
                </div>
                {
                    sessionStorage.getItem("AUTH_TOKEN") && sessionStorage.getItem("USER_ID")===product.sellerId.toString()?
                        <div className="flex-row f-between" style={{width:"17em"}}>
                            <a href={`/users/${product.sellerId}/products/${product._id}/edit`}>Edit</a>
                            <ARB btnStyle={{height:"2em"}} onClick={deleteProduct} label="Delete"/>
                        </div>
                    : null
                }

            </div>
        )
    }       
}