import React, {useState} from 'react'
import './index.css'

export default (props)=>{

    return(
        <div style={{width:"100%", position:"absolute", top:"20%", left:"0%", zIndex:1, ...props.style}}>
            <div className="snippet" data-title=".dot-flashing">
            <div className="stage">
                <div className="dot-flashing"></div>
            </div>
            </div>
        </div>
    )
}