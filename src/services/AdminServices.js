import Axios from "axios"


class AdminService {
    constructor() {
        this.api = Axios.create({
         //baseURL: "http://localhost:8888/api",
           baseURL: "http://46.4.249.19:8888/api",
            headers: {
                'Content-type': 'application/json'
            },
        })

    }
    getProducts(){
        return this.api.get(`/product/products`)
    }

    getProductsItem(codeOfProduct){
        return this.api.get(`/product/tools/find?codeOfProduct=${codeOfProduct}`)
    }
    
    getProductType(language, attributes){
        return this.api.post(`/product/tools/filter`, {language,   attributes})
    }
    search(data){
        return this.api.get(`/product/tools/search?info=${data}`)
       
    }
    payment(user, data){
        return this.api.post(`/payment/Ameriabank`, {"user" : user, "products": data})
    }
    status(data){
        return this.api.get(`/payment/Ameriabank/getStatus?paymentID=`, {data})
    }
}

export default new AdminService()  

