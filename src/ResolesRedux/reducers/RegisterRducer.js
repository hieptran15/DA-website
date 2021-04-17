import { actionType } from "../../actions/actions";

const RegisterReducer=(state={},action)=>{
    switch(action.type){
        case actionType.REGISTER:
            return{loading:true,status:false}

        case actionType.REGISTER_SUCCESS:

            return{loading:false,
                  user:action.payload,
                  status:action.payload.status
            }
        case actionType.REGISTER_ERROR:
            return{loading:false,error: action.payload}

    //...................
    default:
           return state;
    }
}
export default RegisterReducer