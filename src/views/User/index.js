import React from 'react'

import './index.css'

import Buyer from './Buyer'
import Seller from './Seller'

const Dashboard= (props) => {
    
    const role = sessionStorage.getItem("ROLE")

    if(role==="BUYER") {
        return <Buyer {...props} />
    } else if(role==="SELLER") { 
        return <Seller {...props} />
    } else {
        return <span>Invalid Role!</span>
    }
}

export default Dashboard

