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
    getProducts(language){
        return this.api.get(`/product/products${language}`)
    }

    getProductsItem(productName){
        return this.api.post(`/product/find`, { productName })
    }
    
    getProductType(language, attributes){
        return this.api.post(`/product/tools/filter`, {language,   attributes})
    }
    search(data){
        return this.api.get(`/product/tools/search${data}`)
    }
    // payment(data){
    //     return this.api.post(`/Ameriabank`, {data})
    // }
}

export default new AdminService()  // sa jnjvel er qceluc

