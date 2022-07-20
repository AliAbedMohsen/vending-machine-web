// Users.js

import HTTP from '../http'

export default class Users {

	static async login ( data ) {

		let request = new HTTP()

		request.setMethode("POST")

		request.setUrl("/api/login")
        
        let body= new FormData() 

        body.append("username", data.username)

        body.append("password", data.password)

        request.body = body

		return await request.send()
	}

	static async register ( body ) {

		let request = new HTTP()

		request.setMethode("POST")

		request.setUrl("/api/register")
        
        request.body = body

		return await request.send()
	}

	static async user ( params ) {
        
        let token =  sessionStorage.getItem("AUTH_TOKEN")

		let request = new HTTP()

		request.setMethode("GET")
         
		request.setUrl(`/api/users/${params.id}`)
        
        request.setHeaders({ Authorization: token})

		return await request.send()
	}

    static async logout ( {id} ) {
        
        let token =  sessionStorage.getItem("AUTH_TOKEN")

		let request = new HTTP()

		request.setMethode("DELETE")
         
		request.setUrl(`/api/logout`)
        
        request.setHeaders({ Authorization: token})

		return await request.send()
	}


}

   