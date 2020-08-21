// Survey Field contains logic to render a single label and text input
import React from 'react';

// props.input contains text-input event handlers supplied by redux form
export default ({ input, label, meta: { error, touched } }) => { // destructuring .input and label(not RF) from props; error and touched from meta which contains metadata on each field; 2nd level destructure    
   
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ margin: 0}}/>  {/* spr Op used instead of calling all handlers individually: onBlur={input.onBlur} etc. */}
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}  {/* touched is bool; if (touched) && error contains a string then return string */}
            </div>
        </div>
    );
}

