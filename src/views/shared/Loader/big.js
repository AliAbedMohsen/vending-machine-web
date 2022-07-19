import React, {useState} from 'react'
import './big.css'

export default (props)=>{

    return(
        <div style={{width:"100%", ...props.style}}>
            <div  className="snippet-big" data-title=".dot-flashing-big">
                
                <div className="stage-big"  style={{position:"relative"}}>
                    <div className="dot-flashing-big"></div>
                    <span style={{position:"absolute", top:"75%", left:"45%", fontSize:"1.5em"}}>Loading...</span>

                </div>
            </div>
            
        </div>
    )
}