import React, { useEffect, useState } from "react";
import axios from "axios";
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';



function Payment(){
   const [pay, Setpay]= useState({
    clientToken:null,
    success:'',
    error:'',
    instance:""
   })

  const {clientToken, instance}=pay

    useEffect(()=>{
        try {
            axios.get('http://localhost:7575/token').then(data=>{
                console.log('clientToken', data.data.message.clientToken)
                Setpay({clientToken:data.data.message.clientToken})

            }).catch(err=>{
               console.log('err', err.message)
            })
        } catch (error) {
            console.log('error', error.message)
        }
    },[])


    const transaction=()=>{
        try {
            instance.requestPaymentMethod().then(data=>{
                console.log('nonce',data)
                console.log('paymentNonce', data.nonce)
                if(data){
                    let res={
                        amount:100,
                        paymentMethodNonce:data.nonce
                    }
                    axios.post('http://localhost:7575/transaction',res).then(paymentData=>{
                        console.log(paymentData)
                        
                    }).catch(err=>{
                        console.log("err", err.message)
                    })
                }
            })

        } catch (error) {
            console.log("error", error.message)
        }
    }

    return(
        <>
        <h1>Payment Detail</h1>
        {clientToken && (
         <div>
         <DropIn
            options={{authorization: clientToken}}
            onInstance={(instance)=>Setpay({ ...pay, instance:instance})}
         />
         <button className="btn btn-primary" onClick={()=>transaction()}>buy</button>
         </div>
        
        )}
        </>
    )
}

export default Payment;