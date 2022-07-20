import React, { useEffect, useState } from "react";
import './index.css'
import BigLoader from '../../shared/Loader/big'
import { Products } from "../../../server-api";

export default ( props ) => {
    let pid = props.match.params.id

    let [isLoading, setIsLoading] = useState(true) 
    let [product, setProduct] = useState(true) 
    
    const fetchProduct = async () => {
       try {
            const response = await Products.product({pid})

            if(response.data) {
                setProduct(response.data.product)
            } else {
              // redirect
            }  
            
            setIsLoading(false)      

       } catch (error) {
           
            setIsLoading(false)
           
            console.log('fetchProduct > error', error)
       } 

    }
    
    useEffect(()=>fetchProduct(), [])

    if(isLoading){
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {
    
        return(
            <div className="flex-col">
                <div className="flex-row" style={{width:"15em"}}>
                    <span>Product Name:</span>
                    <span>{product.name}</span>
                </div>
                <div className="flex-row" style={{width:"15em"}}>
                    <span>Available Amount:</span>
                    <span>{product.availableAmount}</span>
                </div>

                <div className="flex-row" style={{width:"15em"}}>
                    <span>Added at:</span>
                    <span>{product.created_at}</span>
                </div>

                <div className="flex-row" style={{width:"15em"}}>
                    <span>Seller :</span>
                    <span>{product.seller.username}</span>
                </div>
            </div>
        )
    }       
}