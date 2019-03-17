/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History';
// import './App.css';
import firebase from '../../Config/Firebase'
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
import PersistentDrawerLeft from '../Dashboard/Dashboard';
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationArrow)


const provider = new firebase.auth.FacebookAuthProvider();
class Directions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coords: {}
        };

        this.login = this.login.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
        this.getDirections = this.getDirections.bind(this);
        this.Back = this.Back.bind(this);
    }

    componentDidMount() {
        const { location, currentUser } = this.props
        console.log('location.state', location.state.userData, currentUser);
        const currentUserCoords = { lat: currentUser.latitude, lon: currentUser.longitude }
        const meetingPlaceCoords = { lat: location.state.lat, lon: location.state.lng }
        this.setState({ currentUserCoords, meetingPlaceCoords })
        this.setPosition();
    }

    login() {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;

        }).catch(function (error) {

        });
    }

    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }

    Back() {
        const { location } = this.props
        console.log('location.state*******', location.state)
        History.push({
            pathname: location.state.path,
            state: location.state
        })
    }

    getDirections() {
        const { location, currentUser } = this.props
        console.log('location.state', this.props, currentUser)

        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            // origin: new google.maps.LatLng(24.8812296, 67.0727269),
            // destination: new google.maps.LatLng(24.8861479, 67.0595196),
            origin: new google.maps.LatLng(currentUser.latitude, currentUser.longitude),
            destination: new google.maps.LatLng(location.state.lat, location.state.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    }

    render() {
        const { coords, directions, currentUserCoords, meetingPlaceCoords } = this.state;
        return (
            <div>
                <PersistentDrawerLeft />
                <MyMapComponent
                    isMarkerShown
                    coords={coords}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `350px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    userLocation={currentUserCoords}
                    meetingPlace={meetingPlaceCoords}
                // bothCoords={{ origin: currentUserCoords, place: meetingPlaceCoords }}
                />
                <Button color={"primary"} variant={"outlined"} size={"large"} onClick={this.Back}>Back</Button>
                <Button style={{ margin: '10px' }} color={"primary"} variant={"outlined"} size={"large"} onClick={this.getDirections}>
                    <FontAwesomeIcon
                        size='1x'
                        icon={"location-arrow"}
                    />
                    Get Directions
                </Button>
            </div>
        )
    }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.userLocation.lat, lng: props.userLocation.lon }}
    >

        <Marker position={{ lat: props.userLocation.lat, lng: props.userLocation.lon }} />
        <Marker position={{ lat: props.meetingPlace.lat, lng: props.meetingPlace.lon }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // meetingRequest: (meetingObj, currentUserUID, meetingUserUID) => {
        //     dispatch(meetingRequestAction(meetingObj, currentUserUID, meetingUserUID))
        // }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Directions);