import { FETCH_USER } from '../actions/types';


export default (state = null, action) => {    // null = initialize
    // console.log(action);    // this will show payload data containing; 
    switch (action.type) {
        case FETCH_USER: 
            return action.payload || false  // if '' then return false ('' is falsey in js); this is to prevent return of empty string  
        default:
            return state;
    }
}