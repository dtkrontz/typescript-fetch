import React from 'react';

const LocationDisplay = (props) => {

    return (
        <div>
            <h4>The Temp in {props.name} is:</h4>
            {props.weather}
        </div>
    )
}

export default LocationDisplay;