import actionTypes from '../constant/constants';
const INITIAL_STATE = {
    userName:'M.Bilal'
}
export default (states = INITIAL_STATE, action) =>{
    switch(action.type){
        case actionTypes.USER_NAME :
        return ({
            ...states,
            userName:action.payload
        })
        default:
        return states;
    }

}