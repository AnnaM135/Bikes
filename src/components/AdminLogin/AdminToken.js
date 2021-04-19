export class AdminToken{
    static setToken(token){
        localStorage.setItem('adminToken',token)
    }
    static getToken(){
        return  localStorage.getItem('adminToken')
    }
    static deleteToken(){
        localStorage.removeItem('adminToken')
    }
}