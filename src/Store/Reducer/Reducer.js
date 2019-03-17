import ActionTypes from '../Constant/Constant';

const INITIAL_STATE = {
    currentUser: {},
    currentUserUID: '',
    users: [],
    userDataArray: [],
    unlikeArray: [],
    meetingsArray: [],
    requestsArray: [],
    Condition: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.CURRENTUSERUID:
            return ({
                ...state,
                currentUserUID: action.payload
            })
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            })
        case ActionTypes.USERDATAARRAY:
            return ({
                ...state,
                userDataArray: action.payload
            })
        case ActionTypes.UNLIKEARRAY:
            return ({
                ...state,
                unlikeArray: action.payload
            })
        case ActionTypes.MEETINGSARRAY:
            return ({
                ...state,
                meetingsArray: action.payload
            })
        case ActionTypes.REQUESTSARRAY:
            return ({
                ...state,
                requestsArray: action.payload
            })
        case ActionTypes.CHANGES:
            return ({
                ...state,
                Condition: action.payload
            })
        default:
            return state;
    }

}
