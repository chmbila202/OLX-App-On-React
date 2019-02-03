import actionTypes from '../constant/constants';
export function changeState(updatevalue) {
    return dispatch => {
        dispatch({type:actionTypes.USER_NAME, payload:updatevalue})
    }
}