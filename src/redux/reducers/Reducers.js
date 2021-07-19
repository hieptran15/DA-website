import { combineReducers } from "redux";
import loadParamReducer from "../../ResolesRedux/reducers/LoadParam";
import loginReducer from "../../ResolesRedux/reducers/LoginReducers"
import RegisterReducer from "../../ResolesRedux/reducers/RegisterRducer"

const rootReducer = combineReducers({
    register: RegisterReducer,
    login: loginReducer,
    load: loadParamReducer
})
export default rootReducer;