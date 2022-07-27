
import  dateFormat from "date-format"

export default class Helpers {

    static  resolveError = (attribute, error, isNested=false, nestedKey) => {
      
        if(typeof error==="string") {
          return error
        } 

        if(error  && error.name==="CastError"){
  
            return error.path ===attribute ?  `invalid ${attribute} value` : ''
  
        } else{
          
          if(isNested){
            
            let _error= error && error.errors ? error.errors : {}
              
  
            let msg= _error[attribute] && _error[attribute].errors  && _error[attribute].errors[nestedKey] ?  _error[attribute].errors[nestedKey].message : ''
            

            return this.renderErrorMessage(msg)

          } else {
            
            let _error= error && error.errors ? error.errors : {}
              
            let msg=  _error[attribute] ? _error[attribute].message : ''

            
            return this.renderErrorMessage(msg)
          }
        
        }
    
    }
    
    static renderErrorMessage = (key) => {
      switch(key) {
///////////////// USERNAME ////////////////////////
        case "USERNAME_REQUIRED":
             
            return "You must provide a username." 

        case "USER_NOT_FOUND":
             
            return "No user with the provided username is found." 
            
        case "USERNAME_TAKEN":
             
            return "The username you entered is already taken." 

        case "INVALID_USERNAME":
             
            return "You entered invalid username."

        case "LONG_USERNAME":
             
            return "Username max allowed length is 25 chars"

        case "SHORT_USERNAME":
             
            return "Username min allowed length is 3 chars"

////////////////// PASSWORD  ///////////////////////////////

      case "PASSWORD_REQUIRED":
                  
        return "You must provide a password."

      case "INCORRECT_PASSOWRD":
                  
        return "Password you enetered is incorrect."
        
      case "INVALID_PASSWORD_MAX_LEN_75_MIN_LEN_6":
            
          return "Valid password must be a string between 6 and 75 chars."

////////////////// Role  /////////////////////////////// 
      case "ROLE_REQUIRED":
                        
        return "You must select between being a seller or buyer."

////////////////// DEPOSIT  /////////////////////////////// 
      case "INVALID_DEPOSIT":
                             
        return "You entered invalid deposit."

////////////////// PRODUCT NAME /////////////////////////////// 
      case "PRODUCT_NOT_FOUND":
                             
        return "The product you are trying to purchase is not not found."
      
      case "PRODUCT_NAME_IS_TAKEN" :

          return "The product name you entered is not available."

      case "MISSING_PARAMS_PRODUCT_OR_AMOUNT":
                             
        return "You must select a product with a valid amount."

      case "NAME_REQUIRED":
                             
        return "Product name is required."

      case "INVALID_PRODUCT_NAME":
                             
        return "A valid product name must be a string."

      case "LONG_PRODUCT_NAME":
                             
        return "Max product name length is 20 chars."

      case "SHORT_PRODUCT_NAME":
                             
          return "Min product name length is 3 chars."

////////////////// PRODUCT COST /////////////////////////////// 
      case "COST_REQUIRED":
                             
          return "Product cost is required."
          
      case "INVALID_COST":
                             
          return "Cost must be an integer number and divisible by 5 (examples are 5, 10,..., 950)."
      
      case "LONG_COST":
          return "Max cost value is 950."

////////////////// PRODUCT AMOUNT /////////////////////////////// 
      case "AMOUNT_REQUIRED":

          return "Product anount is required."
       
      case "INVALID_AMOUNT":
                        
          return "You entered invalid product amount."
    
      case "LONG_AMOUNT": 
                        
          return "Max amount value is 999."

      // case "SELLER_REQUIRED": 
                        
      //     return "."
    
      default : return key
      }
    }

    static formatDate(dateStr) {
        let date= new Date(dateStr)
        let formatted =dateFormat('dd-MM-yyyy', date )

        return formatted
    }

    static formatDatetime(dateStr) {
      let date= new Date(dateStr)
      let formatted =dateFormat('dd-MM-yyyy hh:mm:ss ', date )

      return formatted
    }
    
    static capitalize(v) {
      
      let parts= v.split(" ")
      let formated= parts.map( p =>{
            let chunks= p.split("")
            chunks[0]= chunks[0].toUpperCase()
            return chunks.join("")
      }).join(" ")

      return formated
    }

}