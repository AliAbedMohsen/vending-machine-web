import React, { useEffect, useState } from "react";
import { AsynchronousReactButton as ARB} from "asynchronous-react-button";
export default ( props ) => {

    const [product, setProduct] = useState({})
    const [payload, setPayload] = useState({})

    useEffect(()=> {
        setProduct(props.data)
        
    }, [props.data])
    
    useEffect(()=>{ if(product&& product._id) setPayload({productId:product._id}) }, [product])

    const handlePickedAmount = (value)=> {
       setPayload({...payload, amount:value})
    }

    return (
        <div className="product-container">
            <span className="name-holder"><a href={`/products/${product._id}`}>{product.name}</a></span>
            <div className="available-amount" >
                <span>Available:</span>
                <span>{product.availableAmount}</span>
            </div>

            <div className="available-amount" >
                <span>Cost:</span>
                <span>{product.cost}</span>
            </div>
            <AmountPicker onChange={handlePickedAmount} availableAmount={product.availableAmount} />
            <ARB onClick={(rb) => props.buy(rb, payload )} label="Buy" />
        </div>
    )
}

const AmountPicker= ( {onChange, availableAmount} ) => {
    const [value, setValue]= useState(1)
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

    return(
        <div className="amount-picker">
            <input value={value} onChange={onChange} type={"text"} readOnly />
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
    )
}