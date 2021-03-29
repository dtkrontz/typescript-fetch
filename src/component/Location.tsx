import React, {Component} from 'react';
import LocationDisplay from './LocationDisplay';

type Props ={

}

type State = {
    latitude: number,
    longitude: number,
    weather: number,
    name: string
}

export default class Location extends Component<Props, State> {
    constructor (props: Props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            weather: 0,
            name: ''
        }
    }

    successfulCoord = (obj: any) => {
        this.setState(
            {
                latitude: Math.round(obj.coords.latitude),
                longitude: Math.round(obj.coords.longitude)
            }
        )
        console.log('latitude', this.state.latitude);
        console.log('longitude', this.state.longitude)
    }

    failedCoord = () => {
        console.log('User did not allow location services on browser.')
    }

    componentDidMount = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successfulCoord, this.failedCoord);
    }
}

    componentDidUpdate = ({}, prevState: State) => {
        if (prevState.latitude !== this.state.latitude) {
            this.fetchWeather();
            // this.setState(
            //     {
            //         weather: ((Math.floor((json.main.temp - 273.15)*(9/5)+32)))
            //     }
            // )
        }
    }

    fetchWeather = () => {
        console.log(this.state.latitude);
        console.log(this.state.longitude);

        const baseURL: string = 'https://api.openweathermap.org/data/2.5/weather';
        const key: string = '4e531f0413b09c60d9b522b5479f1ff1';

        if (this.state.latitude !== NaN && this.state.longitude !== NaN) {
            fetch(`${baseURL}?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${key}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState(
                    {
                        weather: ((Math.floor((json.main.temp - 273.15)*(9/5)+32))),
                        name: json.name
                    }
                )
            })
        }
    }

    render() {
        return(
            <div>
                {/* if thing ? display weather : display loading weather */}
                {this.state.name !== '' ? <LocationDisplay name={this.state.name} weather={this.state.weather} /> : <h3>Loading Weather!</h3>}
                {/* <LocationDisplay name={this.state.name} weather={this.state.weather} /> */}
                {/* <p>The Temp in {this.state.name} is:</p>
                {this.state.weather} */}
            </div>
        )
    }
}