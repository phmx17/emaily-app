import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
   componentDidMount() {
       this.props.fetchSurveys();
   }
   renderSurveys = () => {
    return this.props.surveys.reverse().map(survey => {
        return(
            <div className="card blue-grey darken-1" key={survey._id}>
                <div className="card-content white-text">
                    <span className="card-title">{survey.title}</span>
                    <p>
                        {survey.body}
                    </p>
                    <div className="right" style={{ display: 'inlineBlock', margin: '0 30px' }}>
                        Last Response: {new Date(survey.lastResponded).toLocaleString()}
                    </div>
                    <div className="right" style={{ display: 'inlineBlock', margin: '0 10px'}}>
                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                    </div>
                </div>                
                <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                </div>             
            </div>
        )
    })
   }

    render() {
        return (
            <div>
                <h3>Survey List</h3>
                {this.renderSurveys()}
            </div>
        );
    };
}
const mapStateToProps = ({ surveys }) => {
    return { surveys }
}
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);