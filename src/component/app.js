import './App.css';

import Nasa from './Components/Nasa'
import Weather from './Components/Weather';
import Footer from './Components/Footer'

import React, {useState, useEffect} from 'react';
import {Card, CardBody, Container, Row, Col} from 'reactstrap';


function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //grabbing lattitude/longitude
  const successfulCoord = (obj) => {
      setLatitude(obj.coords.latitude);
      setLongitude(obj.coords.longitude);
  }
  
  const failedCoord = (obj) => {
      console.log('User did not allow location services on browser.');
  }
  
  //place in a useEffect, or it will continue firing
  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulCoord, failedCoord);
    }
  }, [])

  return (
    <div className="App">
      <br/>
      <h1>24-Hour React App</h1>
      <br/>
      <br/>
      <Container className='mainBody'>
        <Row>
          <Col><Nasa latitude={latitude} longitude={longitude} /></Col>
          <Col><Weather latitude={latitude} longitude={longitude}/></Col>
        </Row>
      </Container>
      <br/>
      <br/>
      <Footer className='footer'/>
    </div>
  );
}

export default App;