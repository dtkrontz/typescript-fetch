import React, {useEffect, useState} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const Weather = (props) => {
    const [tempCel, setTempCel] = useState('');
    const [tempFah, setTempFah] = useState('');
    const [tempDisplay, setTempDisplay] = useState(0);
    const [weather, setWeather] = useState('');

    // console.log(tempCel);
    // console.log(tempFah);
    // console.log(tempDisplay);
    console.log(weather);

    //setting fetch
    const fetchWeather = () => {
        const latitude = Math.round(props.latitude);
        const longitude = Math.round(props.longitude);
        console.log(latitude, longitude);

        const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
        const key = '4e531f0413b09c60d9b522b5479f1ff1';

        if (props.latitude !== '' && props.longitude !== '') {
            fetch(`${baseURL}?lat=${latitude}&lon=${longitude}&appid=${key}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setTempCel(Math.floor(json.main.temp - 273.15));
                setTempFah(Math.floor((json.main.temp - 273.15)*(9/5)+32));
                setTempDisplay(Math.floor((json.main.temp - 273.15)*(9/5)+32));
                setWeather(json.weather[0].description);
            })
        }
    }

    //on click event
    const toggleTemp = (e) => {
        e.preventDefault();

        if (tempDisplay === tempFah) {
            setTempDisplay(tempCel);
        } else {
            setTempDisplay(tempFah);
        }
    }

    /*
        issue: how long the API takes to return coordinates
            fix: pass dependencies into useEffect then loads when state change occurs, firing
            fetchWeather(), but the fetch only occurs when BOTH values are !== empty strings
    */
    useEffect(() => {
        fetchWeather();
    }, [props.latitude, props.longitude])
    

    return(
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Your Local Weather</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">This app uses Location Services, so please allow for the browser to track your location to view your local weather.</CardSubtitle>
                    <br/>
                    {(weather !== '') ? <CardText>Weather Description: {weather}</CardText> : <CardText>Please wait for weather description to load.</CardText>}
                    {(tempDisplay === tempFah) ? <CardText>Temperature: {tempDisplay} F°</CardText> : (tempDisplay === tempCel) ? <CardText>Temperature: {tempDisplay} C°</CardText> : <CardText>Please wait for temperature information to load.</CardText>}
                    <Button onClick={(e) => toggleTemp(e)}>Toggle Fahrenheit/Celsius</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Weather;