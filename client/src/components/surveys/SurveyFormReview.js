// show client form review before final submit
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // supplies history object supplied by react-router
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions';   //  submitSurvey

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {    //  formValues comes from mapStateToProps, submitSurvey is an action creator passed from connect()(), history comes from withRouter()
   
    // create helper array
    const reviewFields = _.map(formFields, ({ label, name }) => {  
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]} 
                </div>
            </div>
        ) // [name] = field.name; getting value out of nested property
    })    
      
    return (
        <div>
            <h5>Please confirm your entries.</h5>
            {reviewFields}            
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel} style={{ marginTop: '20px' }}>
                Back
            </button>
            <button 
                className="green darken-1 white-text btn-flat right" 
                style={{ marginTop: '20px' }}
                onClick={() => submitSurvey(formValues, history)}> {/* AC makes post request to '/api/surveys'; history is from withRouter*/}
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {    
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview)); // supply history object
 