import React, {useEffect, useState} from "react";
import './index.css'
import BigLoader from '../shared/Loader/big'
import ProductItem from "./ProductItem";
import { Products } from "../../server-api";
export default ( props ) => {
    
    let [isLoading, setIsLoading] = useState(true) 
    let [products, setProducts] = useState(true) 
    
    const fetchProducts = async () => {
       try {
            const response = await Products.products()

            if(response.data) {
                setProducts(response.data.products)
            } else {
              // redirect
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
            <div className="flex-row f-start w-fill">
                {
                    products.map((p, index) => {
                        return <ProductItem key={index} data={p}/>
                    })
                }
            </div>
        )
    }       
}