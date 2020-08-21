import axios from 'axios';
import { FETCH_USER,FETCH_SURVEYS } from './types';

// reduxThunk gives direct access to the dispatch function; it also allows return of a function instead of object
export const fetchUser = () => async dispatch => { // return and {} optional    
    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data});   // watch video 88 for this exciting refactor 
}   
   
    // without redux-thunk; object returned
    // const response = await axios.get('/api/current_user')
    // return {
    //     type: FETCH_USER,
    //     payload: response
    // }

export const handleToken = token => async dispatch => {     // ES6 abbreviation
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history) => {     // history = react-router object
    return async (dispatch) => {    // dispatch gets inserted (passed) by redux-thunk
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');   // redirect
    dispatch({type: FETCH_USER, payload: res.data}) // used to update local user model
}
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

