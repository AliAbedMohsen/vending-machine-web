// customPicker.js

import React, {useState, useEffect} from 'react'

const CustomPicker = ( props ) => {
   
   let { titleKey, idKey, pickedItemId} = props
   
   let renderItemsWithParentsSelectable= () => {
      
      let formattedItemsList= []
      
      props.items.forEach((item, index) => {
     
          if(item.parent == null) {
                   
                formattedItemsList.push(
                         <option value={item[props.idKey]}
                           key={index}
                           >{item[props.titleKey]}
                         </option>
                )

                if(item.children) 
                  item.children.map( (child, i) =>{

                    formattedItemsList.push(
                      <option key={i+index+Math.random()}  value={child[idKey]} >{"--" + child[titleKey]}</option>
                    )
                      if(child.children) 
                        child.children.map( (sub, indx) => {
                      
                          formattedItemsList.push(
                              <option key={i+index+indx+Math.random()}  value={sub[idKey]} >{"---" + sub[titleKey]}</option>
                          )
                            
                    })
                  
                  })

          } else{

          }

      })

      return formattedItemsList

   }

   const renderItems = () => {

      return props.items.map((item, index)=>{

             let formatted=item[titleKey]

             if(item.parent===null){
               return false
             } else{

                formatted=item.parent[titleKey]+'--'+ item[titleKey]
             return(
               <option value={item[idKey]}
                 key={index}
                 >{formatted}
               </option>)
             }
      })

   }

    const onChange = ({target}) => {
      
      props.setPicked(target.value)
    }
       
    let pickerStyle= { 
      width:"90%", 
      padding:'10px',  
      fontSize:'16px', 
      // borderColor:errorText && errorText.length > 0 ? "red" : "#777",
      borderRadius:"5px",
      margin:"0.1em",
      // fontSize:"14px"
    } 

    let requiredStyle= props.dir==="rtl" ? 
     {...styles.required, left:"5px"} 
    : {...styles.required, right:"5px" }
    
    let legendStyle= props.dir==="rtl" ? 
      {...styles.legend, right:"10px"} 
    : {...styles.legend, left: '10px'}
    
    return (
      <div dir={props.dir || "ltr"} className={props.containerClass || ''} style={{...styles.col, ...props.containerStyle}}>
        <div style={{...styles.fieldSet, ...styles.row, ...props.fieldsetStyle || {} }}  >
          
          <legend style={legendStyle}> {props.label}  </legend>
          {props.required? <span style={requiredStyle}> * </span> : null}

              <select
                style={props.style || {...pickerStyle, ...props.pickerStyle, borderColor: props.errorText && props.errorText.length > 0 ? "red" : "#000" } }
                className={props.className || "custom-picker"}
                defaultValue={pickedItemId}
                onChange={onChange}
                disabled={props.disabled}
              > 
                <option value="">-- {props.placeholder} --</option>
                  {
                    props.parentsSelectable ? renderItemsWithParentsSelectable() : renderItems()
                  }
              </select>
          </div>
          { props.errorText ? <span style={styles.error} >{props.errorText}</span> : null}
   
      </div>

   	)
}

const styles={
    
    row:{

      display:"flex", 
      
      flexDirection:"row", 
      
      justifyContent:"space-between",

      // border:'1px solid #000',
      // width: 'max-content'
      // width: '18.75em',
      
    
    },
    col:{
      
      display:"flex", 
      
      flexDirection:"column", 
      
      justifyContent:"center",
    },
    
    picker:{
        margin: '10px auto',
        paddingHorizontal: '10px',
        paddingBottom: '10px',
        borderRadius: '5px',
        borderWidth: '1px',
        alignItems: 'center',
        borderColor: '#777',
        width:"inherit",
        height:'70px',
        position:'relative',
        textAlign:'center',
        cursor:"pointer"
    },

    fieldSet:{
      margin: '10px auto',
      // paddingHorizontal: '10px',
      // paddingBottom: '10px',
      borderRadius: '5px',
      borderWidth: '1px',
      alignItems: 'center',
      borderColor: '#777',
      width:"inherit",
      height:'60px',
      position:'relative',
      width:"100%"
      
    },
    
    legend:{
        position: 'absolute',
        top: '-10px',
        fontWeight: '500',
        backgroundColor: '#fff',
        color:"rgb(77, 70, 70)"
    },
  
    error:{
      fontSize:"12px",
      color:"red",
      padding:"8px",
      textAlign:"center"
    },

    required:{
      position: 'absolute',
      top: '-1px',
      // right: '5px',
      fontWeight: '500',
      color: 'red',
    }

}

export default CustomPicker