


const InitialState = {
    products: [],
    load:true,
    AdminEmail:'',
    language:'hy'
};

function reduxstate(state = InitialState, action) {
    switch (action.type) {
        case "ADMINLOGIN":
            return {
                ...state,
                AdminEmail:action.payload,
            };
        case 'PRODUCTS':
            return {
                ...state,
                products:action.payload
            }
        case "LANG":
            return {
                ...state,
                language:action.payload
            }
        default:
            return state; 
    }
}
export default reduxstate;