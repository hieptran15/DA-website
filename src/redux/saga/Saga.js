import {all} from 'redux-saga/effects'
const { watchSagaLoginUser, watchSagaRegisterUser} = require("../../ResolesRedux/Saga");

function* rootsaga(){
    yield all([
        watchSagaLoginUser(),
        watchSagaRegisterUser(),
    ])
}
export default rootsaga;