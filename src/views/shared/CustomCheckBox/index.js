
import React, { useState } from 'react'
import './index.css'
import Loader from "../Loader";

const CustomCheckBox =  (props) => {

    let { errorText} = props

    const [loading, showLoader]= useState(false)
        
    const onCheck= (bool)=>{
      if(props.async) showLoader(true)
      props.onCheck(bool, releaseBtn)
    }
    
    const releaseBtn = ()=> {
      showLoader(false)
    }
    
    let id= (Math.random() + Math.random()) * Math.random()

    return (
        <div dir={props.dir || "ltr"} className='flex-col'>
          <div style={{position:"relative"}}>
    
              {
                props.async && loading? 
                    <Loader style={{top:"-75%"}} />
                  
                : null
              } 
    
              <label className='flex-row' style={{margin:"5px", position:"relative", ...props.style}}>
    
                  <input id={id} data-dir={props.dir || "ltr"} className='' style={{backgroundColor:"#1c4a36"}} checked ={props.checked} onChange={(e)=> onCheck(e.target.checked)} type="checkbox" />
    
                  <label className='wrap-words'  htmlFor={id}>
                    {props.label} 
                    {props.children}
                    {props.required? <span style={styles.required}> * </span> : null}
                  </label>
    
              </label> 
                    {/* <div dir={props.dir || "ltr"} style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                        <input data-dir={props.dir || "ltr"} className='custom-checkbox-btn' style={{backgroundColor:"#1c4a36"}} checked ={props.checked} onChange={(e)=> onCheck(e.target.checked)} type="checkbox" />
                        <label >
                          {props.label}
                          {props.children}
                        </label>
                    </div> */}
          
          </div>
    
          {errorText ? <span style={styles.error}>{errorText}</span> : null}  
    
        </div> 
      
    ) 
}

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

    row:{
      
      // display:"flex", 
      
      // flexDirection:"row", 
      
      // justifyContent:"space-between",

      // border:'1px solid #000',

      width: '300px'
    
    },

    error: {
      fontSize: '13px',
      color: colors.error,
      paddingTop: '1px',
      marginBottom:"20px"
    },

    required:{

      fontWeight: '500',
      color: 'red',
    }

    
}

export default CustomCheckBox

