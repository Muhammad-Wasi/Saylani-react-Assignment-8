import React, { Component } from 'react';
import { connect } from 'react-redux';
import { datastoredinfirebaseAction, checkuserAction } from '../../Store/Action/Action';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Button } from '@material-ui/core';


class SimpleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null
        };

        this.updateCoords = this.updateCoords.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillMount() {
        const { currentUserUID, usersUIDArray, currentUserObj } = this.props;
        console.log('currentUserUID, usersUIDArray', currentUserUID, usersUIDArray)
        this.props.checkuser(currentUserUID, usersUIDArray, currentUserObj)
    }

    componentDidMount() {
        this.setPosition();
    }

    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }

    submit() {
        const { coords } = this.state;
        console.log('this.props.currentUserUID', this.props.currentUserUID)
        let currentUserObj = { latitude: coords.latitude, longitude: coords.longitude, ...this.props.currentUserObj }
        this.props.datastoredAction(this.props.currentUserUID, currentUserObj)
    }


    render() {
        const { coords } = this.state;
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                {coords && <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coords={coords}
                    updateCoords={this.updateCoords}
                />}
                <br />
                <Button variant={"outlined"} color={"primary"} onClick={this.submit}>Submit</Button>
                <br />
            </div>
        );
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                    props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />}
    </GoogleMap>
))

function mapStateToProp(state) {
    return ({
        currentUserObj: state.root.currentUser,
        usersUIDArray: state.root.users,
        currentUserUID: state.root.currentUserUID,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        datastoredAction: (currentUserUID, currentUserObj) => {
            dispatch(datastoredinfirebaseAction(currentUserUID, currentUserObj))
        },
        checkuser: (userUID, usersUIDArray, currentUserObj) => {
            dispatch(checkuserAction(userUID, usersUIDArray, currentUserObj));
        }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SimpleMap);