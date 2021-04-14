import langReducer from "./languages/reducer"
import {combineReducers} from "redux"
import basketReducer from "./languages/reducer"

export default combineReducers({
    langReducer,  
    basketReducer,
})