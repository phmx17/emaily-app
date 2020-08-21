import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
    render() {        
        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            > 
                <button className="btn z-depth-2">Add credits</button>
            </StripeCheckout>
        );
    }
}
// amount{} is in cents; token{} = callback after receiving token from stripe api; confusing; should have been named onToken

export default connect(null, actions)(Payments); // no {} around actions!