import React, {useEffect, useState} from "react";
import './index.css'
import BigLoader from '../shared/Loader/big'
import ProductItem from "./ProductItem";
import { Products, Users } from "../../server-api";
import Dialog from "../shared/Dialog/Dialog";
import { AsynchronousReactButton as ARB } from "asynchronous-react-button";
export default ( props ) => {
    
    let [isLoading, setIsLoading] = useState(true) 
    let [invoice, setInvoice] = useState({open:false, data:{}}) 

    let [products, setProducts] = useState(true) 
    
    const fetchProducts = async () => {
       try {
            const response = await Products.products()
            debugger
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
    
    const buy = async (releaseBtn, payload) => {
        try {
             const response = await Users.buy(payload)
             
             if(response.data) {
                
                setInvoice({open:true, data:response.data})
             } else if(response.request.status===400) {
                
               alert(response.response.data.error)
             }  
             
            releaseBtn()
 
        } catch (error) {
            
            releaseBtn()
            
            console.log('fetchProduct > error', error)
            window.location.replace("/unexpected?e="+error)
        } 
 
    }

    const collectChange= async (releaseBtn) => {
        try {
            
            const response = await Users.withdraw({})
            
            if(response.data) {
                releaseBtn()
                setInvoice({open:false, data:{}})

            } else if(response.request.status===400) {
                releaseBtn()
                alert(response.response.data.error)
            
            }  
             
            
 
        } catch (error) {
            
            releaseBtn()
            
            console.log('collectChange > error', error)
            window.location.replace("/unexpected?e="+error)
        } 
 
    }
     
    useEffect(()=> fetchProducts, [])

    if(isLoading){
    
        <div style={{height:"20em", position:"relative"}}><BigLoader active={true} /></div>
    
    } else {
    
        return(
            <div className="products-container flex-row f-start w-fill wrap">
                {
                    products.map((p, index) => {
                        return <ProductItem buy={buy} key={index} data={p}/>
                    })
                }

                <Invoice collectChange={collectChange} onClose={()=> setInvoice({open:false, data:{} }) } invoice={invoice} />
            </div>
        )
    }       
}


const Invoice= ( {onClose, collectChange, invoice} ) => {
    
    return(
        <Dialog onClose={onClose} isShown={invoice.open}>
            <div className="flex-col f-between w-fill">
                <div className="flex-row">
                    <span>Purchased:</span>
                    <span>{invoice.data.product ? invoice.data.product.name : ""}</span>
                </div>

                <div className="flex-row f-between w-fill">
                    <span>Total Spent:</span>
                    <span>{invoice.data.spent+" "}Cents</span>
                </div>

                <div className="flex-row f-between w-fill">
                    <span>Change Items:</span>
                    {
                        invoice.data.change? 
                            invoice.data.change.map((c, i)=> <span key={i}>{c+" "}Cents</span> )
                        :null
                    }
                </div>

                <div className="flex-row f-between w-fill">
                    
                    <ARB label="Collect Change?" onClick={collectChange} />
                </div>

            </div>
        </Dialog>
    )
}