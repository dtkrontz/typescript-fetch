import React from 'react';

const LocationDisplay = (props) => {

    return (
        <div>
            <h2>The Temp in {props.name} is:</h2>
            <h3>{props.weather} degrees fahrenheit</h3>
        </div>
    )
}

export default LocationDisplay;