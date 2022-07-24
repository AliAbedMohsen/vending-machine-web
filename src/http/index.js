import axios from 'axios'
// import fetchAdapter from '@vespaiach/axios-fetch-adapter';

import {HOST} from '../constants'

axios.defaults.withCredentials=true
export default class HTTP  {
   
    constructor ( method, url, params, body, headers, uploadProgressHandler ) {

      
      this.method= method || 'GET'

      this.url= url || ''

      this.params = params || {}

      this.body = body || {}

      this.headers = headers || {}

      this.uploadProgressHandler=  uploadProgressHandler || null


    }

    setHeaders(headers ) {
   
       this.headers = headers
   
    }

    setUrl( url ) {
   
        this.url = url

    }

    setBody ( body ) {

    	this.data = body
    }

    setParams ( params ) {

    	this.params = params
    }

    setMethode( method ) {
      

      this.method = method

    }
    
    setUploadProgressHandler ( callback ) {
       
       this.uploadProgressHandler = callback
    
    }

    async send () {
        
        let response = null
        let request= this
    	// try{

    		response =await axios(
    			
          {
    				// adapter: fetchAdapter,
    				method: this.method,
            
    				url: HOST + this.url,
            
            withCredentials:true,

            headers: this.headers,

    				params: this.params,

            data: this.method !== "GET" ? this.body : {},

            onUploadProgress: function( progressEvent ) {
              
              if(request.uploadProgressHandler) {

                  let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
                  
                  request.uploadProgressHandler(percentCompleted)
              }
              
            }

    			}

    		).catch (err => err)

      // debugger
      if(response.request.status===401){
        window.location.replace("/login")
        return
      } else if(response.request.status===403){
        window.location.replace("/unauthorized")
        return
      } else if(response.request.status===404){
        window.location.replace("/404")
        return

      } else if(response.request.status===500){
        window.location.replace("/500")
        return
      }
    	return response
    }

}