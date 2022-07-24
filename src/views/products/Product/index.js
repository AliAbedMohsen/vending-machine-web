import React, { useEffect, useState } from "react";
import './index.css'
import BigLoader from '../../shared/Loader/big'
import { Products } from "../../../server-api";
import {AsynchronousReactButton as ARB} from 'asynchronous-react-button'
import Helpers from "../../shared/Helpers";
import { useHistory } from "react-router-dom";

import { BASE_COLOR } from "../../../constants/style";

export default ( props ) => {

    let history = useHistory();
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
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {
    
        return(
            <div className="flex-col">
                {/* <h2>Product Details</h2> */}
                <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900"}}>Product Details</span>

                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Product Name:</span>
                    <span>{product.name}</span>
                </div>

                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Product Cost:</span>
                    <span>{product.cost+" Cents"}</span>
                </div>

                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Available Amount:</span>
                    <span>{product.availableAmount}</span>
                </div>

                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Created at:</span>
                    <span>{Helpers.formatDatetime(product.created_at) }</span>
                </div>
                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Updated at:</span>
                    <span>{Helpers.formatDatetime(product.updated_at) }</span>
                </div>
                <div className="flex-row f-between" style={{width:"16em"}}>
                    <span>Seller :</span>
                    <span>{product.seller.username}</span>
                </div>
                
                <div className="flex-row f-between wrap" style={{width:"15em", padding:"1em", margin:"1em auto", borderTop:"1px solid #ccc"}}>
                    <a style={{width:"4em"}} onClick={()=>history.goBack()} className="custom-button">Back</a>

                {
                    sessionStorage.getItem("AUTH_TOKEN") && sessionStorage.getItem("USER_ID")===product.sellerId.toString()?
                        
                        <a style={{width:"4em"}} className="custom-button" href={`/users/${product.sellerId}/products/${product._id}/edit`}>Edit</a>
                         
                    : null
                }

                {
                    sessionStorage.getItem("AUTH_TOKEN") && sessionStorage.getItem("USER_ID")===product.sellerId.toString()?
                                                  
                        <ARB 
                            confirm={{
                                message:"You are about to delete the product! Are you sure?",
                                ok:"Yes", 
                                cancel:"No"
                            }} 
                            btnStyle={{ width:"4.9em", height:"2.1em"}} 
                            onClick={deleteProduct} 
                            label="Delete"
                            btnClass="custom-button"
                        />
                                
                    : null
                }
                </div>
            </div>
        )
    }       
}