import {actionType, login_user_Error, login_user_Success, registerError, registerSuccess,} from "../actions/actions";
import {takeLatest,put} from "redux-saga/effects";
import Axios from "axios";
function* sagaRegisterUser(value){
    const data=value.payload
    try {
        const response = yield Axios.post("http://localhost:8080/api/user/register",data)
            // const resjson = yield response.json()
                 yield put(registerSuccess(response));
            }
    catch (error) {
                yield put(registerError(error))
            }
}
export function* watchSagaRegisterUser(){
    yield takeLatest(actionType.REGISTER, sagaRegisterUser)
}

function* sagaLoginUser(user){
    const data=user.payload
    try {
        const response = yield Axios.post("http://localhost:8080/api/user/singIn",data)
            // const resjson = yield response.json()
                 yield put(login_user_Success(response));
                 yield localStorage.setItem('aulogin', JSON.stringify(response.data.token));
                 yield localStorage.setItem('userName', JSON.stringify(response.data.name));
                 yield localStorage.setItem('email', JSON.stringify(response.data.email));
                 yield localStorage.setItem('role', JSON.stringify(response.data.role));
            }
    catch (error) {
                yield put(login_user_Error(error))
            }
}
export function* watchSagaLoginUser(){
    yield takeLatest(actionType.LOGIN_USER, sagaLoginUser)
}

