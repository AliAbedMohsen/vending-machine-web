
/** 
 * React Component: Dialog
 *
 * @author  Ali Mohsen
 * @version 0.1.0, 30/06/2022
 * @since   now
 */

import React, {useEffect, useRef, useState} from "react";

import './dialog.css'


export default (props) => {

    const {isShown, onClose}= props
    const [blurDivStyle, setStyle]= useState({})
    const [shown, toggleDialog]= useState(isShown)
    const blurDiv= useRef(null)
 
    useEffect(()=> {
        
        calculateSize()

        window.addEventListener("resize", calculateSize);  
        
        return()=> window.removeEventListener('resize', calculateSize)

    }, [])
    
    const calculateSize= () => {
        let height= window.innerHeight
        let width= window.innerWidth
        setStyle({width:width+"px", height:height+"px"})
    }

    const onCancelHandler= ()=>{

        // onAction(false)
    //    showDialog(false)
    }

    const onOkHandler = ()=> {
        // onAction(true)
        // showDialog(false)
    }
    
    useEffect(()=> {toggleDialog(isShown)},  [isShown])

    return(
        <div ref={blurDiv} style={{zIndex: shown? "999": "-1", display: shown? "flex": "none", ...blurDivStyle}} className={'dialog'}>
            <div className={"overlay"}></div>
            <div className={"inner-wrapper"} style={ props.innerWrapperStyle || {} }>
            <button className="close-dialog-btn" onClick={onClose}>X</button>

                {props.children}
            </div>    
        </div>
    )
}

