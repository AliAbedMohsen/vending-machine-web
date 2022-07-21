
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
            

            return msg

          } else {
            
            let _error= error && error.errors ? error.errors : {}
              
            let msg=  _error[attribute] ? _error[attribute].message : ''

            
            return msg
          }
        
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

    static timeSince(date)  {
      
      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
      ];
      
      const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
      const interval = intervals.find(i => i.seconds < seconds);
      if(interval){
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      } else {
        return "just now"
      }

      
    }



}