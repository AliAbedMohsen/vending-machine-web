import React, {useState, useEffect} from 'react'

import CustomCheckBox from '../CustomCheckBox'
import './index.css'
export default ( props ) => {
    
    // const [_list, setList] =   useState( [] )
    const {errorText}= props

    useEffect(()=> {
    //   setList(props.defaultList)
    }, [])

    const onCheck =(bool, id) => {
       let _list= props.defaultList
       if(bool){
        
        // setList([..._list, id])
        _list.push(id)
        props.onChange(_list)
        } else {
          
          let updated= _list.filter((x) => x !== id)
          
        //   setList(updated)
        props.onChange(updated)
       }

       
    }

    let requiredStyle= props.dir==="rtl" ? 
        {...styles.required, left:"5px"} 
    : {...styles.required, right:"5px" }
  
    return(

        <div className='checkbox-group-wrapper' style={{width:"-webkit-fill-available"}}>
            <div className="title"  style={{position:"relative"}} >
                {props.title}

                {props.required? <span style={requiredStyle}> * </span> : null}

            </div>
            {
              props.list.map((item, index) => {
                // let id= item._id
                if(!item.parent)  
                    return(
                    
                        <div style={{border:"1px solid #ccc", margin:"0.3em"}} key={index} className="checkbox-list">
                            <span >{item.title_en}</span>
                            <div style={{width:"-webkit-fill-available"}}>
                                {
                                    item.children.map((c, i)=> {
                                        
                                        let isChecked= props.defaultList.find((item)=> item === c._id ) ? true : false
                                        
                                        return(
                                            
                                            <CustomCheckBox style={{width:"max-content", fontSize:"0.8em"}} checked={isChecked} key={i} label={c.title_en} onCheck={(bool)=> onCheck( bool, c._id)}/>

                                        )
                                    })
                                }
                            </div>


                        </div>
                    
                    
                    )
              })
            }
            
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
  
    error: {
      fontSize: '12px',
      color: colors.error,
      paddingTop: '8px',
      // marginBottom:"20px"
    },
  
  
      required:{
        position: 'absolute',
        top: '-1px',
        // right: '5px',
        fontWeight: '500',
        color: 'red',
      },
  }
  