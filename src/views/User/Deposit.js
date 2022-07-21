import React, { useState } from "react";
import Modal from '../shared/Modal'
import CustomPicker from '../shared/CustomPicker'
import { AsynchronousReactButton as ARB } from "asynchronous-react-button";
import { Users } from "../../server-api";
import Helpers from "../shared/Helpers";
const resolveError= Helpers.resolveError

const Deposit = ( props ) => {
    
    const [deposit, updateDeposit] =  useState(props.deposit)

    const [payload, setPayload] = useState({})

    const [error, setError] = useState(null)

    const ALLOWED_CENTES=[
        {id:5, title:"5 Cents"}, 
        {id:10, title:"10 Cents"},
        {id:20, title:"20 Cents"},
        {id:50, title:"50 Cents"},
        {id:100, title:"100 Cents"}
    ]
    
    const onAttributeChange = (value, key) => {
        setPayload({...payload, [key]:value})
    }
    
    const submit = async (releaseBtn) => {
        try {
            let response = await Users.deposit(payload)
            if(response.data && response.data.deposit) {
                updateDeposit(response.data.deposit)
                setError(null)
            } else if(response.request.status===400) {

                setError(response.response.data.error)
            }

            releaseBtn()

        } catch (error) {
            releaseBtn()
            window.location.replace("/unexpected?e="+error)
        }
       
    }
    
    const reset= ()=> {
        setPayload({})
        props.updateDeposit(deposit)
    }

    const init= ()=> {
        setError(null)
    }

    let depositError= resolveError("deposit", error)
    
    return(
        
        <Modal btnStyle={{height:"4em", width:"8em", margin:"0.2em", borderRadius:"5px", border:"1px solid #000"}} openButton="Add Deposit" onClose={reset} onOpen={init} >
            <div className="flex-col">
                <span>Current Balance: {deposit+" "}Cents</span>
                <CustomPicker 
                    placeholder={'Select Deposit'} 
                    setPicked={(picked) => onAttributeChange(picked, 'deposit')} 
                    label={"Deposit"} 
                    errorText={depositError}
                    items={ALLOWED_CENTES}  
                    titleKey={'title'} 
                    idKey={'id'}
                    parentsSelectable= {true}
                    pickerStyle={{ borderStyle:"none", outline:"none", backgroundColor:"#fff"}}
                    fieldsetStyle={{borderStyle:"solid"}}
                    containerClass={'custom-picker-container'}
                    containerStyle={{width:"15em", margin:"auto"}}
                    pickedItemId={ '' }
                    required
                />

                <ARB onClick={submit} label="Insert" />
            </div>
        </Modal>
    )
}

export default Deposit