import React, {useEffect, useState} from "react";
import './index.css'
import BigLoader from '../shared/Loader/big'
import ProductItem from "./ProductItem";
import { Products } from "../../server-api";

import { BASE_COLOR } from "../../constants/style";

export default ( props ) => {
    
    let [isLoading, setIsLoading] = useState(true) 
    let [products, setProducts] = useState(true) 
    
    const fetchProducts = async () => {
        
        try {
            
            let uid = props.match.params.id

            const response = await Products.myProducts({uid})
            
            if(response.data) {
                setProducts(response.data.products)
            } else {
            // redirect
                window.location.replace("/")
            }  
            
            setIsLoading(false)      

        } catch (error) {
            
                setIsLoading(false)
            
                console.log('fetchProduct > error', error)
        } 

    }

     
    useEffect(()=> fetchProducts, [])

    if(isLoading){
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {
    
        return(
            <div style={{width:"100%"}}>
                <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900", borderBottom:"1px solid #000"}}>My Products</span>

                
                <div className="products-container flex-row f-start w-fill wrap">
                    {
                        products.map((p, index) => {
                            return <ProductItem  key={index} data={p}/>
                        })
                    }

                </div>
            </div>
        )
    }       
}

