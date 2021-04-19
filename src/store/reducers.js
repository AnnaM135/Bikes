import langReducer from "./languages/reducer"
import {combineReducers} from "redux"
import basketReducer from "./languages/reducer"
 import Reducer1 from '../components/redux/reducer/reducer';


export default combineReducers({
    langReducer,  
    basketReducer,
    Reducer1

})