import constants from "./const"

let initState = {
    langId: "HY",
    card: []
}

export default function langReducer(state = initState, action) {
    
    switch (action.type) {
        case constants.CHANGE_LANG_ID: {
            return {
                ...state,
                langId: action.value
            }
        }
        case "addCard":return{
            card: action.value
        }
        default: return state;
    } 
}