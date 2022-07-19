
import React from 'react'

import  './index.css'

// import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';

const CustomRadioButton= ( props ) => {

    let {errorText} = props
    
    let requiredStyle= props.dir==="rtl" ? 
        {...styles.required, left:"5px"} 
    : {...styles.required, right:"5px" }

    return(
 
            <div dir={props.dir || "ltr"} className="custom-radio-btn-wrapper" >
                
                <label>{props.title}</label>
                
                {props.required? <span style={requiredStyle}> * </span> : null}
 
                {
                   props.items.map( (item, index) => {
                        
                        return(
                            <p dir={props.dir || "ltr"} key={index} style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                <input data-dir={props.dir || "ltr"} value={item.id} onChange={(e) => props.onChange(e.target.value)} className="custom-radio-btn" type="radio" id={`test${index}`} name="radio-group" />
                                <label htmlFor={`test${index}`}>{item.label}</label>
                            </p>
                        )
                   })
                }
                
                {errorText ? <span style={styles.error}>{errorText}</span> : null}

            </div>
	)

} 

export default CustomRadioButton


const styles= {
    error: {
        fontSize: '13px',
        color: "#f13a59",
        paddingTop: '1px',
        marginBottom:"20px"
      },

      required:{
        position: 'absolute',
        top: '-1px',
        // right: '5px',
        fontWeight: '500',
        color: 'red',
      }
  
}