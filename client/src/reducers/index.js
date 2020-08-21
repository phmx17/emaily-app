import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';


export default combineReducers({    // link state property auth to output of its reducer (null, User model, false)
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});  