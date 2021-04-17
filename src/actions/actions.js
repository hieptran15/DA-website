export const actionType={
    REGISTER:"REGISTER",
    REGISTER_SUCCESS:"REGISTER_SUCCESS",
    REGISTER_ERROR:"REGISTER_ERROR",

    LOGIN_USER:"LOGIN_USER",
    LOGIN_USER_SUCCESS:"LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR:"LOGIN_USER_ERROR",
}

// REGISTER.................................
export const registers=(value)=>{
    return {type:actionType.REGISTER,payload:value}
}
export const registerSuccess=(value)=>{
    return {type:actionType.REGISTER_SUCCESS,
            payload:value
    }
}
export const registerError=(value)=>{
    return {type:actionType.REGISTER_ERROR,payload:value}
}

//LOGIN USER.................................
export const login_user=(value)=>{
    return {type:actionType.LOGIN_USER, payload:value}
}
export const login_user_Success=(value)=>{
    return {type:actionType.LOGIN_USER_SUCCESS,
            payload:value
    }
}
export const login_user_Error=(value)=>{
    return {type:actionType.LOGIN_USER_ERROR,payload:value}
}

