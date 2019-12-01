import React from 'react';
import PropTypes from 'prop-types'

ErrorContainer.propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string,
    clear: PropTypes.func.isRequired,
};

export default function ErrorContainer(props) {
    return <div>
        {props.show && <>{props.text}<img alt='close' onClick={props.clear}
                                          src='x-square.svg'/></>}
    </div>
}
