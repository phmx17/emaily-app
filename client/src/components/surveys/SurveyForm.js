// form for client to add input 
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form'; // very similar to { connect()() }
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
// helper function using lodash for a change; .map() works just as well.
    renderFields() {
        return _.map(formFields, ({ label, name }) => { // ES6 destructure
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} /> // name = key in redux store; previously: component="input"
        })
    }    
    render() {
        return (
            <div>
              <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> {/*handleSubmit provided by reduxForm connector */}
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                    <i className="material-icons right">cancel</i>
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>                
              </form>
            </div>
        );
    };
}
// validation rules
const validate = (values) => {
    const errors = {};
    
    errors.recipients = validateEmails(values.recipients || '');    // this runs 1st time as undefined and will cause error in console

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must enter a value.'    // less customized error messages; could add noValueErr = '...' to each FIELD element and add it here
        }
    });


    return errors; 
}
    // if (!values.title) {
    //     errors.title = "You must enter a title.";
    // }
    // if (!values.subject) {
    //     errors.subject = "You must enter a subject line."
    // }
    // if(!values.body) {
    //     errors.body = "You must enter an email body."
    // }

export default reduxForm({
    validate,
    form: 'surveyForm', // name a key under the 'form' reducer for storing values and properties of a specific form
    destroyOnUnmount: false // don't reset form
})(SurveyForm);
