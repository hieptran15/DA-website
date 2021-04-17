import {combineReducers} from "redux";
import loginReducer from "../../ResolesRedux/reducers/LoginReducers"
import RegisterReducer from "../../ResolesRedux/reducers/RegisterRducer"

const rootReducer=combineReducers({
    register:RegisterReducer,
    login:loginReducer,

})
export default rootReducer;