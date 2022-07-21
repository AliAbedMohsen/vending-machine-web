import React, {useState, useEffect} from 'react'

import './index.css'

import Buyer from './Buyer'
import Seller from './Seller'

export default (props) => {
    
    const role = sessionStorage.getItem("ROLE")

    if(role==="BUYER") {
        return <Buyer {...props} />
    } else if(role==="SELLER") { 
        return <Seller {...props} />
    } else {
        return <span>Invalid Role!</span>
    }
}

