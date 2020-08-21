import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // gives components the ability to call action creators
import * as actions from '../actions';  // import all action creators

import Header from './Header'
import Landing from './Landing';
import DashBoard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// dummy components
// const Header = () => <h2>Header</h2>;
// const DashBoard = () => <h2>DashBoard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (            
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={DashBoard} />
                    <Route path="/surveys/new" component={SurveyNew} />                        
                </div>
                </BrowserRouter>            
        )
    };
}
export default connect(null, actions)(App);
