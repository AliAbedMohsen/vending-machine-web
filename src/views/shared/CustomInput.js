// CustomInput.js

import React, { useEffect } from 'react'
import Helpers from './Helpers'

const CustomInput = React.forwardRef ((props, ref) => {
   
  let { errorText} = props
  
  let inputStyle= { 
                width:"100%", 
                padding:'10px',  
                fontSize:'16px', 
                // borderColor:errorText && errorText.length > 0 ? "red" : "#777",
                borderRadius:"5px",
                borderStyle:"none",
                outline:"none",
                WebkitTransform: "translateZ(0px)"
  }   
  
  // useEffect(()=> alert(props.errorText), [props.errorText])
  // fieldSetStyle.borderColor =  errorText && errorText.length > 0 ? "red" : "#777"

  
  let requiredStyle= props.dir==="rtl" ? 
   {...styles.required, left:"5px"} 
  : {...styles.required, right:"5px" }
  
  let legendStyle= props.dir==="rtl" ? 
    {...styles.legend, right:"10px"} 
  : {...styles.legend, left: '10px'}
  
  const renderValue= (v) =>{
    if(v){

      switch(props.valueAppearance) {
        case 'UPPERCASE':

          return v.toUpperCase()

        case 'CAPITALIZE' :
          return Helpers.capitalize(v)

        default : return v
      }
    }

    return v
  }

  return (
    
    <div dir={props.dir} style={styles.col}>
 
      <div style={{...styles.fieldSet, ...styles.row, ...props.style || {} }}  >
        
      <legend style={legendStyle}> {props.label}  </legend>
          {props.required? <span style={requiredStyle}> * </span> : null}
          {props.prefix? <span style={styles.prefix}>{props.prefix}</span>:null}
          <input 
            value={props.value}
            defaultValue={renderValue(props.defaultValue)}
            onChange={props.onTextChange}
            placeholder={props.placeholder}
            ref={ref}
            type={props.type || "text"}
            style = { props.inputStyle || inputStyle}
            disabled={props.disabled}
            readOnly={props.readOnly}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}  
            
          /> 
      </div>	

      {errorText ? <span style={{...styles.error, ...props.errorTextStyle}}>{errorText}</span> : null}
    
    </div>        
  
   ) 
})

let colors= {
  text: '#000',
    primary: '#777',
    secondary: '#000',
    error: '#f13a59',
}

let styles = {
    container: {
      width: '100%',
      marginVertical: '12px',
    },
    // input: {
    //   backgroundColor: '#fff', width:"300px", textAlign:"center"
    // },
    description: {
      fontSize: '13px',
      color: colors.secondary,
      paddingTop: '8px',
    },
    error:{
      fontSize:"12px",
      color:"red",
      padding:"3px",
      marginBottom:"5px",
      textAlign:"center"
    },

      row:{
        
        display:"flex", 
        
        flexDirection:"row", 
        
        justifyContent:"space-between",

        // border:'1px solid #000',

        width: 'max-content'
      
      },
      
      col:{
        
        display:"flex", 
        
        flexDirection:"column", 
        
        justifyContent:"center",
        
        textAlign: "center"
        // border:'1px solid #000',

        // width: '300px'
      
      },

      fieldSet:{
          margin: '10px',
          // paddingHorizontal: '10px',
          // paddingBottom: '10px',
          borderRadius: '5px',
          borderWidth: '1px',
          alignItems: 'center',
          // borderColor: '#777',
          width:"inherit",
          height:'60px',
          position:'relative',
          borderStyle:"dashed",
          borderColor:"#777"
      },
      
      legend:{
          position: 'absolute',
          top: '-10px',
          // left: '10px',
          fontWeight: '500',
          backgroundColor: '#fff',
          color:"rgb(77, 70, 70)"
      },

      required:{
        position: 'absolute',
        top: '-1px',
        // right: '5px',
        fontWeight: '500',
        color: 'red',
      },

      prefix:{
        color:"#777",
        fontWeight:"bolder",
        marginInlineStart:"0.2em"
      }
}

export default CustomInput