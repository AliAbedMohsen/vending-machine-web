import React, {useState, useEffect, useRef} from "react";
import CustomCheckBox from "../CustomCheckBox";
import { AntDesign } from 'react-web-vector-icons';
import './index.css'
export default ( props ) => {

    const {items, titleKey, idKey, label, renderChildren}= props

    const [selected, setSelected] = useState({[props.titleKey]:'Not assigned'})
    
    const [dropdownState, setDropdownState]= useState('CLOSE')
    
    const element = useRef(null)

    useEffect(() => {
        const handel=(e)=>{
            
                if(element.current && element.current.contains(e.target)){
                    
                //    openDropdown()
                } else {
                    
                    closeDropdown()
                }
                
            
        }

        document.addEventListener("click", handel);
        
        return () => {
            document.removeEventListener("click", handel);
        };

    }, []);

    const closeDropdown= ()=> {
        setDropdownState(  "CLOSE" )
    }

    const openDropdown= ()=> {
        setDropdownState(  "OPEN" )
    }
    
    const toggleDropdown= ()=> {
        setDropdownState( dropdownState === "OPEN" ? "CLOSE" : 'OPEN')
    }
    
    const select = (item) => {
       setSelected(item)
       setDropdownState('CLOSE')
       props.onChange(item[idKey])
    }


    const renderItems = () => {

            return items.map((item, index)=>{
      
                
                if(renderChildren){
                    let formatted=item[titleKey]
                    if(item.parent===null){
                        return <span className="select-box-item" >{formatted}</span>
                    } else{
        
                        formatted='--'+ item[titleKey]
                                                
                        return(
                            <span className="select-box-item" onClick={()=> select(item)}>{formatted}</span>
                        )
    
                    }
                } else{ // only parents
                    let formatted=item[titleKey]

                    if(item.parent===null){
                        return <span className="select-box-item" onClick={()=> select(item)}>{formatted}</span>
                    }
                }
            })
      
         
    }

    return(
  
        <main className={props.className} dir={props.dir || "ltr"} ref={element} style={{...styles.wrapper, ...props.style}}>
            <div onClick={()=>toggleDropdown()} style={styles.selectedWrapper}>
                <span>{label}:</span>
                <span onClick={()=>toggleDropdown()} style={styles.selectedLabel} >
                   {selected[titleKey]} 
                </span>
                <div style={{cursor:"pointer"}} onClick={()=>toggleDropdown()}> 
                    <AntDesign  color="#000" size="16" name={dropdownState==="OPEN" ? "up" : "down"} />  
                </div>
               
            </div>
            <div style={{...styles.dropdown, display: dropdownState==="OPEN" ? "flex" : "none"} }>
                {
                    renderItems()
                }
            </div>
        </main>
    )
}

const styles= {
    wrapper:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        // padding:"0.2em",
        // margin:"0.1em",
        position:"relative",
        // border:"1px solid red",
        // width:"30%",
        minWidth:"fit-content"

    },
    selectedWrapper:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"nowrap",
        justifyContent:"space-between",
        border:"2px solid #777",
        // width:"100%"
        padding:"0.3em",
        // margin:"auto 0.2em",
        width:"100%",
        cursor:"pointer"
    },
    selectedLabel:{

        fontSize:"12px",
        color:"blue",
        cursor:"pointer",
        padding:"0.2em"
    },
    dropdown:{
        display:"none",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding:"0.3em",
        margin:"auto 0.2em",
        position:"absolute",
        top:"33px",
        border:"1px solid #ccc",
        backgroundColor:"#fff",
        zIndex:"100",
        maxHeight:"10em",
        overflow:"auto",
        width:"100%"
    }
}
