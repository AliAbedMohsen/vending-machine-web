import React, { useEffect, useState } from "react";

export default ( props ) => {

    const [product, setProduct] = useState({})
    const [payload, setPayload] = useState({})

    useEffect(()=> {
        setProduct(props.data)
        setPayload({pid:props.data._id})
    }, [props.data])

    const handlePickedAmount = ({target})=> {
       setPayload({...payload, amount:target.value})
    }

    return (
        <div className="product-container">
            <span className="name-holder"><a href={`/products/${product._id}`}>{product.name}</a></span>
            <div className="available-amount" >
                <span>Available:</span>
                <span>{product.availableAmount}</span>
            </div>
            <AmountPicker onChange={handlePickedAmount} availableAmount={product.availableAmount} />
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
        }
    
    }
    
    const decrease= ({target}) => {
        let newValue= parseInt(value) - 1
        if(  newValue > 0 ){
            setValue(newValue)
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