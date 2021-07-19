const loadParamReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_PARAM": {
            return { loadParma: action.payload }
        }
        //...................
        default:
            return state;
    }
}
export default loadParamReducer