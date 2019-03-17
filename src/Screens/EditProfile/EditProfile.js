import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase';
import History from '../../History';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { datastoredinfirebaseAction, checkuserAction } from '../../Store/Action/Action';
import PersistentDrawerLeft from '../Dashboard/Dashboard';
import { Button, TextField, Checkbox, Input } from '@material-ui/core';
import '../EditProfile/EditProfile.css';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedF: false,
            coffee: '',
            juice: '',
            cocktail: '',
            timeA: '',
            timeB: '',
            timeC: '',

            nickname: '',
            number: '',


            image1: '',
            image2: '',
            image3: '',

            email: '',
            coords: null,

        }

        this.handleChange = this.handleChange.bind(this);
        this.nickname = this.nickname.bind(this);
        this.number = this.number.bind(this);

        this.updateCoords = this.updateCoords.bind(this);
        this.uploadimage = this.uploadimage.bind(this);

        this.submit = this.submit.bind(this);


    }

    componentWillMount() {
        const { checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, timeA, timeB, timeC } = this.state;

        const { currentUserObj, currentUserUID } = this.props;
        console.log('currentUserObj', currentUserObj)
        console.log('currentUserUId', currentUserUID)
        this.setState({
            nickname: currentUserObj.nickname,
            number: currentUserObj.number,
            image1: currentUserObj.image1,
            image2: currentUserObj.image2,
            image3: currentUserObj.image3,
            latitude: currentUserObj.latitude,
            longitude: currentUserObj.longitude,
            email: currentUserObj.email,
            name: currentUserObj.name,
            photo: currentUserObj.photo,
            coords: { latitude: currentUserObj.latitude, longitude: currentUserObj.longitude, }
        })

        if ('coffee' === currentUserObj.beverage1) {
            this.setState({
                checkedA: !checkedA,
                coffee: currentUserObj.beverage1
            })
        }
        if ('juice' === currentUserObj.beverage2) {
            this.setState({
                checkedB: !checkedB,
                juice: currentUserObj.beverage2
            })
        }
        if ('cocktail' === currentUserObj.beverage3) {
            this.setState({
                checkedC: !checkedC,
                cocktail: currentUserObj.beverage3
            })
        }
        if ('30' == currentUserObj.time1) {
            this.setState({
                checkedD: !checkedD,
                timeA: currentUserObj.time1
            })
        }
        if ('60' == currentUserObj.time2) {
            this.setState({
                checkedE: !checkedE,
                timeB: currentUserObj.time2
            })
        }
        if ('120' == currentUserObj.time3) {
            this.setState({
                checkedF: !checkedF,
                timeC: currentUserObj.time3
            })
        }
    }

    componentDidMount() {
        this.setPosition();
    }

    handleChange(e) {
        const { checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, timeA, timeB, timeC } = this.state;
        console.log(timeA, timeB, timeC)
        console.log('Values', e.target.value, 'checkedA', checkedA, 'checkedB', checkedB, 'checkedC', checkedC)
        const value = e.target.value
        if ('coffee' === value) {
            if (!checkedA) {
                this.setState({
                    checkedA: !checkedA,
                    coffee: value
                })
            }
            else {
                this.setState({
                    checkedA: !checkedA,
                    coffee: ""
                })
            }
        }
        if ('juice' === value) {
            if (!checkedB) {
                this.setState({
                    checkedB: !checkedB,
                    juice: value
                })
            }
            else {
                this.setState({
                    checkedB: !checkedB,
                    juice: ""
                })
            }
        }
        if ('cocktail' === value) {
            if (!checkedC) {
                this.setState({
                    checkedC: !checkedC,
                    cocktail: value
                })
            }
            else {
                this.setState({
                    checkedC: !checkedC,
                    cocktail: ""
                })
            }
        }
        if ('30' == value) {
            if (!checkedD) {
                this.setState({
                    checkedD: !checkedD,
                    timeA: value
                })
            }
            else {
                this.setState({
                    checkedD: !checkedD,
                    timeA: ""
                })
            }
        }
        if ('60' == value) {
            if (!checkedE) {
                this.setState({
                    checkedE: !checkedE,
                    timeB: value
                })
            }
            else {
                this.setState({
                    checkedE: !checkedE,
                    timeB: ""
                })
            }
        }
        if ('120' == value) {
            if (!checkedF) {
                this.setState({
                    checkedF: !checkedF,
                    timeC: value
                })
            }
            else {
                this.setState({
                    checkedF: !checkedF,
                    timeC: ""
                })
            }
        }
    }


    nickname(e) {
        this.setState({ nickname: e.target.value })
    }

    number(e) {
        this.setState({ number: e.target.value })
    }


    uploadimage(index) {
        let that = this;
        var file = document.getElementsByName('file')[index].files[0]; //sames as here
        var reader = new FileReader();

        reader.addEventListener('load', () => {
            let url = reader.result;
            if (index == 0) {
                that.setState({ image1: url })
                console.log('Images1', url)
            }
            else if (index == 1) {
                that.setState({ image2: url })
                console.log('Images2', url)
            }
            else if (index == 2) {
                that.setState({ image3: url })
                console.log('Images3', url)
            }
        })

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        }
    }



    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('coords', position.coords)
            this.setState({ coords: position.coords })
        });
    }

    updateCoords({ latitude, longitude }) {
        console.log(latitude, longitude)
        this.setState({ coords: { latitude, longitude } })
    }



    submit() {
        const { currentUserObj, currentUserUID } = this.props;
        console.log('currentUserObj', currentUserObj, Object.keys(currentUserObj))
        const { coffee, juice, cocktail, timeA, timeB, timeC, nickname, name, photo, email, number, image1, image2, image3, coords } = this.state;
        const currentUserProfile = {
            beverage1: coffee,
            beverage2: juice,
            beverage3: cocktail,
            email,
            image1,
            image2,
            image3,
            latitude: coords.latitude,
            longitude: coords.longitude,
            name,
            nickname,
            number,
            photo,
            time1: timeA,
            time2: timeB,
            time3: timeC
        }
        if (nickname.length > 3 && (/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(number)) &&
            coords.latitude && coords.longitude && (coffee || juice || cocktail) && (timeA || timeB || timeC) &&
            image1 && image2 && image3) {
            alert('Done');
            const db = firebase.database();
            db.ref('users/' + currentUserUID + '/').set(currentUserProfile)
                .then(() => {
                    History.push('/home')
                    console.log('success*****')
                })
        }
        else {
            if (nickname.length < 4) {
                alert('NickName')
            }
            else if (!(/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(number))) {
                alert('Number')
            }
            else if (!coords.longitude && !coords.latitude) {
                alert('Coords')
            }
            else if (!coffee && !juice && !cocktail) {
                alert('Beverages')
            }
            else if (!timeA && !timeB && !timeC) {
                alert('Time')
            }
            else if (!image1 || !image2 || !image3) {
                alert('Images')
            }
        }
        console.log('currentUserProfile', currentUserProfile, Object.keys(currentUserProfile))
    }


    render() {
        const { email, checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, timeA, timeB, timeC, nickname, number, coords, image1, image2, image3 } = this.state;

        return (
            <div className={'EditProfile'} style={{ textAlign: "center" }}>
                <PersistentDrawerLeft />
                <h2>Edit Profile</h2>
                <div>
                    <TextField
                        id="outlined-password-input"
                        label="Nick Name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        value={nickname}
                        onChange={this.nickname}
                    />
                    <br />
                    <TextField
                        id="outlined-password-input"
                        label="Phone Number"
                        type="number"
                        margin="normal"
                        variant="outlined"
                        value={number}
                        onChange={this.number}
                    />
                    <br />
                    <br />
                </div>
                <div>
                    <h2 style={{ fontFamily: 'cambria', margin: '0xp auto' }}>Choose Beverages</h2>
                    <Checkbox
                        checked={checkedA}
                        onChange={this.handleChange}
                        value="coffee"
                        color="primary"
                    />Coffee
                    <Checkbox
                        checked={checkedB}
                        onChange={this.handleChange}
                        value="juice"
                        color="primary"
                    />Juice
                    <Checkbox
                        checked={checkedC}
                        onChange={this.handleChange}
                        value="cocktail"
                        color="primary"
                    />Cocktail
                    <br />
                    <h2 style={{ fontFamily: 'cambria' }}>Choose Time Duration</h2>
                    <Checkbox
                        checked={checkedD}
                        onChange={this.handleChange}
                        value="30"
                        color="primary"
                    />30 min
                    <Checkbox
                        checked={checkedE}
                        onChange={this.handleChange}
                        value="60"
                        color="primary"
                    />60 min
                    <Checkbox
                        checked={checkedF}
                        onChange={this.handleChange}
                        value="120"
                        color="primary"
                    />120 min
                    <br />
                    <br />
                </div>

                <div>
                    <Input
                        type='file'
                        name="file"
                        placeholder="Placeholder"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={() => this.uploadimage(0)}
                    />
                    <br />
                    <img style={{ width: 300, height: 300 }} src={image1} alt="Picture" />
                    <br />
                    <br />
                    <Input
                        type='file'
                        name="file"
                        placeholder="Placeholder"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={() => this.uploadimage(1)}

                    />
                    <br />
                    <img style={{ width: 300, height: 300 }} src={image2} alt="Picture" />
                    <br />
                    <br />
                    <Input
                        type='file'
                        name="file"
                        placeholder="Placeholder"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={() => this.uploadimage(2)}

                    />
                    <br />
                    <img style={{ width: 300, height: 300 }} src={image3} alt="Picture" />
                    <br />
                    <br />
                </div>

                <div style={{ height: '70vh', width: '100%' }}>
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
                    {
                        email ?
                            <Button variant={"outlined"} color={"primary"} onClick={this.submit}>Next</Button>
                            :
                            null
                    }
                    <br />
                    <br />
                </div>

            </div>
        )
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
        currentUserUID: state.root.currentUserUID,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        datastoredAction: (currentUserUID, currentUserObj) => {
            dispatch(datastoredinfirebaseAction(currentUserUID, currentUserObj))
        },
        // checkuser: (userUID, usersUIDArray, currentUserObj) => {
        //     dispatch(checkuserAction(userUID, usersUIDArray, currentUserObj));
        // }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(EditProfile);


// export default EditProfile;


