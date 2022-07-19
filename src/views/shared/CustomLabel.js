import React, {useState} from 'react'

export default ( props ) => {

    return (
        <div className={props.className} style={{...styles.wrapper, ...props.wrapperStyle}}>
            {
              props.title?   
                <span style={{...styles.title, ...props.titleStyle}}>{props.title+": "}</span>
              : null
            }
            <span style={{...styles.value, ...props.valueStyle}}>{props.value}</span>
        </div>
    )
}

const styles = {
    wrapper:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-around",
       flexWrap:"nowrap"
    },
    title:{
       padding:"0.2em",
       margin:"0.2em",
       fontSize:"1em",
       fontWeight:"700"
    },
    value:{
        padding:"0.2em",
        margin:"0.2em",
        fontSize:"1em",
     },
}