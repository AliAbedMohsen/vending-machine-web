import React, {useEffect, useState} from "react";
import './index.css'
import BigLoader from '../shared/Loader/big'
import ProductItem from "./ProductItem";
import { Products, Users } from "../../server-api";
import Dialog from "../shared/Dialog/Dialog";
import { AsynchronousReactButton as ARB } from "asynchronous-react-button";
import { BASE_COLOR, COVER_COLOR } from "../../constants/style";
import Helpers from "../shared/Helpers";
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
                
               alert(Helpers.renderErrorMessage(response.response.data.error) )
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
            <div style={{width:"100%"}}>
                <span style={{color:BASE_COLOR, fontSize:"1.5em", fontWeight:"900", borderBottom:"1px solid #000"}}>All Products</span>

                
                <div className="products-container flex-row f-start w-fill wrap">
                    {
                        products.map((p, index) => {
                            return <ProductItem buy={buy} key={index} data={p}/>
                        })
                    }

                    <Invoice dismissInvoice={()=>setInvoice({open:false, data:{}})}  collectChange={collectChange} onClose={()=> setInvoice({open:false, data:{} }) } invoice={invoice} />
                </div>
            </div>
        )
    }       
}


const Invoice= ( {onClose, collectChange, invoice, dismissInvoice} ) => {
    let amount= invoice.data.product && invoice.data.spent? parseInt(invoice.data.spent)/parseInt(invoice.data.product.cost) : 0
    return(
        <Dialog innerWrapperStyle={styles.dialog} onClose={onClose} isShown={invoice.open}>
            <div className="flex-col f-between w-fill">
                <div className="flex-row f-between w-fill">
                    <span style={styles.purchaseLabel}>You purchased
                    <span style={styles.purchase}>{invoice.data.product ? ` ${amount} ${invoice.data.product.name} item(s)` : ""}</span>
                    </span>
                </div>

                <div className="flex-row f-between w-fill">
                    <span style={styles.spentLabel}>You have spent
                        <span style={styles.spent} >{" "+invoice.data.spent}&#162;</span>
                    </span>
                </div>

                <div className="flex-row f-between w-fill">
                    <span style={styles.change}>Change:</span>
                    {
                        invoice.data.change? 
                            invoice.data.change.map((c, i)=> <span style={styles.coin} key={i}>{c}&#162;</span> )
                        :null
                    }
                </div>

                <div className="flex-row f-between w-fill">
                    
                    <ARB 
                         
                        onClick={collectChange} 
                        btnStyle={{width:"8em", backgroundColor:"#777"}} 
                        label={
                            <span 
                                style={{
                                    color:COVER_COLOR, 
                                    fontWeight:"700",
                                    fontSize:"0.8em"
                                }}
                            >
                                Collect Change?
                            </span>
                        } 
                        confirm={{message:"Collect Coins?", ok:"Yes", cancel:"No" }}
                    />
                    <button onClick={dismissInvoice} className="custom-botton" >Keep Shopping</button>
                </div>

            </div>
        </Dialog>
    )
}

const styles= {
    dialog:{width:"15em", backgroundColor:"#ccc"},
    purchaseLabel:{fontSize:"0.8em", color:"brown", fontWeight:"bolder"},
    purchase:{fontSize:"1.2em", color:"green", fontWeight:"bolder"},
    spentLabel:{fontSize:"0.8em", color:"brown", fontWeight:"bolder"},
    spent:{fontSize:"1.2em", color:"green", fontWeight:"bolder"},
    change:{fontSize:"0.8em", color:"brown", fontWeight:"bolder"},
    coin:{borderRadius:"50%", border:"2px solid brown", textAlign:"center", padding:"2%"},
    collect:{}
}