 const loginReducer=(state={},action)=>{
    switch(action.type){
        case "LOGIN_USER":{
            return{loading:true}
        }
        case "LOGIN_USER_SUCCESS":{
            return{
                loading:false,
                user:action.payload.data.name,
                role:action.payload.data.role,
                token:action.payload.data.token,
            }
        }
        case "LOGIN_USER_ERROR":{
            return{loading:false,error:action.payload}
        }
        case "RELOAD_CART":{
            return{carts:action.payload}
        }
    //...................
    default:
           return state;
    }
}
export default loginReducer
