import React, { useEffect, useState } from "react";
import { AsynchronousReactButton as ARB} from "asynchronous-react-button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import CustomModal from "../shared/Modal";
import { BASE_COLOR } from "../../constants/style";
export default ( props ) => {
    const role= sessionStorage.getItem("ROLE")
    const [product, setProduct] = useState({})
    const [payload, setPayload] = useState({})

    useEffect(()=> {
        setProduct(props.data)
        
    }, [props.data])
    
    useEffect(()=>{ if(product&& product._id) setPayload({productId:product._id, amount:1}) }, [product])

    const handlePickedAmount = (value)=> {
       setPayload({...payload, amount:value})
    }
    
    const {availableAmount, cost}= product

    return (
        <div className="product-container">
            <span className="name-holder">
                <a href={`/products/${product._id}`}>{product.name}</a>
            </span>
            <div className="available-amount" >
                <label>Available:</label>
                <span>{product.availableAmount}</span>
            </div>

            <div className="cost" >
                <label>Cost:</label>
                <span>{product.cost}&#162;</span>
            </div>
            {
                role==="BUYER" ? 
                    <AmountPicker onChange={handlePickedAmount} cost={cost} availableAmount={availableAmount} />

                :   null
            }

            {   
                role==="BUYER" ?            
                    <div className="flex-row w-fill total">
                        <label>Total Cost:</label>
                        <span>{parseInt(payload.amount) * parseInt(cost)}&#162;</span>
                    </div>
                : null
            }

            {
                role==="BUYER" ? 
                    <ARB 
                        btnStyle={{width:"10em", backgroundColor:"#ccc"}} 
                        onClick={(rb) => props.buy(rb, payload )} 
                        label={
                            <span 
                                style={{
                                    color:BASE_COLOR, 
                                    fontWeight:"700",
                                    fontSize:"1.5em"
                                }}
                            >
                                Buy Now!
                            </span>
                        } 
                    />

                :   null
            }
        </div>
    )
}

const AmountPicker= ( {onChange, availableAmount} ) => {
    const [value, setValue]= useState(1)
    // const [openedPanel, openPanel]= useState(false)

    const increase= ({target}) => {
        
        let newValue= parseInt(value) + 1
        availableAmount= parseInt(availableAmount)
        if( availableAmount >= newValue ){
            setValue(newValue)
            onChange(newValue)
        }
    
    }
    
    const decrease= ({target}) => {
        let newValue= parseInt(value) - 1
        if(  newValue > 0 ){
            setValue(newValue)
            onChange(newValue)
        }
    }
    
    
    const applyFromInputPanel= (v)=> {
        if(v.length > 0){
           if( parseInt(v) > 0 && parseInt(v) <= parseInt(availableAmount)){
              setValue(v)
              onChange(v)
           }
        }
    }

    return(
        <div className="amount-picker">
            <div className="label-container">
                <label>How much?</label>
            </div>
            {/* <input onClick={openInputPanel} value={value} onChange={onchange} type={"text"}  /> */}
            <InputPanel apply={applyFromInputPanel} amount={value}   />
            <div className="flex-col">
                <button onClick={increase}><AiFillCaretUp /></button>
                <button onClick={decrease}><AiFillCaretDown /></button>
            </div>

        </div>
    )
}


const InputPanel = ( {amount, apply} ) => {
    let [outcome, setOutcome]= useState('') 
    let [forceClose, setForceClose]= useState(0) 

    const onClick= ({target})=>{
    
        let value= target.innerText
    
        setOutcome((o)=>`${o}${value}`)
    
    }
    
    const onApply= ()=> {
        apply(outcome)
        setOutcome("")
        setForceClose((v)=>v+1)
    }
    return(
        <CustomModal openBtnStyle={{height:"3.5em", width:"3.5em", alignSelf:"center"}} forceClose={forceClose} openButton={amount} closeButton="X">
            <input 
                readOnly
                value={outcome}
                placeholder="input the requested amount" 
                style={{width:"100%", textAlign:"center", height:"2em", border:"none", outline:"none" }}
                
            />
            <div className="flex-row f-start wrap" style={{width:"7em"}} >
                {
                    Array.from("1234567890").map( (n, i) => <button style={{height:"2em", width:"2em"}} onClick={onClick} key={i}>{n}</button>)
                }
                {<button onClick={()=> setOutcome('')} style={{height:"2em", width:"2em"}} key={Math.random()}>C</button>}
                {<button onClick={onApply} style={{height:"2em", width:"2em"}} key={Math.random()}>&#10004;</button>}
            </div>
            
        </CustomModal>
    )
}