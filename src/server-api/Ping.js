
// Ping.js

import HTTP from '../http'

export default class Users {


	static async test ( params ) {
        
        let token =  sessionStorage.getItem("AUTH_TOKEN")

		let request = new HTTP()

		request.setMethode("GET")
         
		request.setUrl(`/test`)
        
        request.setHeaders({ Authorization: token})

		return await request.send()
	}

    
}

   