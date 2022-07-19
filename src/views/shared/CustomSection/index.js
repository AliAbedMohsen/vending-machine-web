// CustomInput.js

import React from 'react'

export default ( props ) => {
   
    let { errorText} = props
      
    let legendDirectionStyle= props.dir==="rtl" ? { right: '0px', } : { left:'0px', }
    
    let layoutDirection= props.layoutDirection ==="col" ? {...styles.col,  ...props.layoutStyle} : {...styles.row, ...props.layoutStyle }
    
    return (
      
      <div className={props.className} style={props.containerStyle || styles.col}>
   
        <div style={{...styles.fieldSet, ...layoutDirection, ...props.fieldSetStyle }}  >
          
          <legend style={{...styles.legend, ...legendDirectionStyle }}> {props.label}  </legend>
              {/* <span style={{fontWeight:"700", fontSize:"1.2em", padding:"0.5em", margin:"0.2em"}} >{props.title}</span> */}
              {props.children}
	      </div>	
	    
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
  // input: {
  //   backgroundColor: '#fff', width:"300px", textAlign:"center"
  // },
  description: {
    fontSize: '13px',
    color: colors.secondary,
    paddingTop: '8px',
  },
  error: {
    fontSize: '13px',
    color: colors.error,
    paddingTop: '1px',
    marginBottom:"20px"
  },

    row:{
      
      display:"flex", 
      
      flexDirection:"row", 
      
      justifyContent:"space-between",

      // border:'1px solid #000',
      flexWrap:"wrap",

      // width: 'max-content'
      width:'100%'
    
    },
    
    col:{
      
      display:"flex", 
      
      flexDirection:"column", 
      
      justifyContent:"center",
      
      textAlign: "center",
      height:"match-content",
      width:"100%"
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
        // height:'60px',
        position:'relative',
        borderStyle:"dashed",
        borderColor:"#ccc",
        padding:"1em"
    },
    
    legend:{
        position: 'absolute',
        top: '-10px',
        fontWeight: '500',
        backgroundColor: '#fff',
        color:"rgb(77, 70, 70)"
    }

}
