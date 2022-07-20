// Users.js

import HTTP from '../http'

export default class Users {

	static async update ( params, body ) {

		let request = new HTTP()

		request.setMethode("PUT")

		request.setUrl(`/api/products/${params.pid}`)
        
        request.body = body

        let token =  sessionStorage.getItem("AUTH_TOKEN")

        request.setHeaders({ Authorization: token})

        request.body = body

		return await request.send()
	}

	static async create ( body ) {

		let request = new HTTP()

		request.setMethode("POST")

		request.setUrl("/api/products")
        
        request.body = body

        let token =  sessionStorage.getItem("AUTH_TOKEN")

        request.setHeaders({ Authorization: token})

		return await request.send()
	}

	static async product ( params ) {
        
        let token =  sessionStorage.getItem("AUTH_TOKEN")

		let request = new HTTP()

		request.setMethode("GET")
         
		request.setUrl(`/api/products/${params.pid}`)
        
        request.setHeaders({ Authorization: token})

		return await request.send()
	}

    static async products ( params ) {
        

		let request = new HTTP()

		request.setMethode("GET")
         
		request.setUrl(`/api/products`)
        
		return await request.send()
	}

    static async delete ( {pid} ) {
        
        let token =  sessionStorage.getItem("AUTH_TOKEN")

		let request = new HTTP()

		request.setMethode("DELETE")
         
		request.setUrl(`/api/products/${pid}`)
        
        request.setHeaders({ Authorization: token})

		return await request.send()
	}

}

   