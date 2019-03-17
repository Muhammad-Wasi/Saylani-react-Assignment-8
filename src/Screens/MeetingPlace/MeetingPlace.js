import React, { Component } from 'react';
import { connect } from 'react-redux';
import { meetingRequestAction } from '../../Store/Action/Action';
import { Button, Input, TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from '@material-ui/core';
import History from '../../History';
import Navbar from '../../Components/Navbar/Navbar';
import color from '@material-ui/core/colors/orange';
import swal from 'sweetalert2';
import PersistentDrawerLeft from '../Dashboard/Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationArrow)


class MeetingPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            allList: [],
            placesList: [],
            searchList: [],
            currentUser: props.currentUser,
            currentUserUID: props.currentUserUID,
            indexNum: null,
            time: '',
            meetingObj: null,
            meetingUserUID: null,
            open: false
        }
        this.searching = this.searching.bind(this);
        this.submit = this.submit.bind(this);
        this.time = this.time.bind(this);
        this.pickTime = this.pickTime.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.getDirection = this.getDirection.bind(this)

        console.log('Propss************', props)
    }

    componentDidMount() {
        const { currentUser, allList } = this.state;
        console.log('Props************', this.props.location.state.userKey)
        this.setState({ meetingUserUID: this.props.location.state.userKey })
        let query1;
        let query2;
        let query3;

        if (currentUser.beverage1) {
            query1 = currentUser.beverage1
        }
        else {
            query1 = ""
        }
        if (currentUser.beverage2) {
            query2 = currentUser.beverage2
        }
        else {
            query2 = ""
        }
        if (currentUser.beverage3) {
            query3 = currentUser.beverage3
        }
        else {
            query3 = ""
        }

        const arr = [query1, query2, query3]

        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=KPVRGVD2JVFIXLROEJCFFUWIHIUHCUORLE1YBF3C25WHEBI4&client_secret=MN1CKGGAYQEVYDIPQY4D3MB0EHKFZ22UC5JYUGJN0W3LOFVV&v=20180323&ll=${currentUser.latitude},${currentUser.longitude}&query=${arr}`)
            .then(response => {
                return response.json();
            }).then(data => {
                // Work with JSON data here
                const items = data.response.groups[0].items
                this.setState({ placesList: [items[0].venue, items[1].venue, items[2].venue] })
                items.map(item => {
                    allList.push(item.venue);
                    this.setState({ allList })
                })
            }).catch(err => {
                // Do something for an error here
            });
    }

    searching(e) {
        const { allList, searchList } = this.state;
        this.setState({ searchText: e.target.value });
        let list = allList.filter(item => {
            let name = item.name;
            const val = e.target.value;
            name = name.toLowerCase();
            if (name.match(val.toLowerCase())) {
                console.log('name*****', name)
                return item
            }
        })
        this.setState({ searchList: list })
    }

    submit(item, index) {
        console.log('item', item, index)
        console.log('this.props.location.state', this.props.location.state)
        this.setState({
            indexNum: index,
            meetingObj: {
                name: item.name,
                address: item.location.address,
                lat: item.location.lat,
                lng: item.location.lng
            }
        })
    }

    time() {
        this.setState({ open: true });
    };

    pickTime(e) {
        const { meetingObj } = this.state;
        console.log('Pick Time', e.target.value)

        meetingObj.time = e.target.value
        this.setState({
            time: e.target.value,
            meetingObj,
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    sendRequest() {
        const secondUser = this.props.location.state.userData
        const { currentUserUID, meetingObj, meetingUserUID, currentUser } = this.state;
        console.log('MeetingObj', meetingObj)
        const meetUserObj = { ...meetingObj, ...secondUser, status: 'Pending' }
        const currentUserObj = { ...meetingObj, ...currentUser, status: 'Pending' }
        this.setState({ open: false });
        this.props.meetingRequest(meetUserObj, currentUserUID, meetingUserUID, currentUserObj);

        // if (time) {
        //     swal({
        //         type: 'success',
        //         title: 'success',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     setTimeout(() => {
        //         History.push('/home')
        //     }, 1500)
        // }
        // else {
        //     swal({
        //         type: 'error',
        //         text: 'Set meeting time please!!!'
        //     })
        // }
    }

    getDirection() {
        console.log('Location********', this.props.location.state)
        const { meetingObj } = this.state;
        const userData = this.props.location.state;
        const meetingData = { ...meetingObj, ...userData, path: '/meetingPlace' };
        console.log('meetingObj', meetingData)
        History.push({
            pathname: '/direction',
            state: meetingData
        })
    }

    render() {
        const { placesList, searchText, searchList, indexNum } = this.state;
        console.log('Itemsssss', placesList)
        return (
            <div>
                <PersistentDrawerLeft />
                <h2>Select a meeting place!</h2>
                <Input style={{ paddingLeft: '8px' }} placeholder='Enter meeting place..' value={searchText} onChange={this.searching} />
                <br />
                <ul>
                    {searchText ?
                        <span>
                            {
                                searchList.length ?
                                    searchList.map((item, index) => {
                                        return <li style={{ listStyleType: 'none', marginLeft: '-40px' }}>
                                            <Button style={{ width: '90%', margin: '5px 0px' }} variant={"outlined"} color={"primary"} onClick={() => this.submit(item, index)}>{item.name} - {item.location.address}</Button>
                                            <br />
                                            {/* <Button style={{ width: '90%', margin: '0px 0px 5px 0px' }} size={"small"} variant={"outlined"} disabled>{item.location.address}</Button> */}
                                            {
                                                indexNum == index ?
                                                    <span>
                                                        <Button size={"small"} variant={"outlined"} style={{ color: 'orange', margin: '0px 10px 10px 5px' }} onClick={this.getDirection} >
                                                            <FontAwesomeIcon
                                                                size='1x'
                                                                icon={"location-arrow"}
                                                            />
                                                            Get Direction
                                                        </Button>
                                                        <Button size={"small"} variant={"outlined"} style={{ color: 'orange', margin: '0px 5px 10px 10px' }} onClick={this.time}>Set Time</Button>
                                                    </span>
                                                    :
                                                    null
                                            }
                                        </li>
                                    })
                                    :
                                    <span>
                                        No places found!!!
                                    </span>
                            }
                        </span>
                        :
                        placesList.map((item, index) => {
                            return <li style={{ listStyleType: 'none', marginLeft: '-40px' }}>
                                <Button style={{ width: '90%', margin: '5px 0px' }} variant={"outlined"} color={"primary"} onClick={() => this.submit(item, index)}>{item.name} - {item.location.address}</Button>
                                <br />
                                {/* <Button style={{ width: '90%', margin: '0px 0px 5px 0px' }} size={"small"} variant={"outlined"} disabled>{item.location.address}</Button> */}
                                {
                                    indexNum == index ?
                                        <span>
                                            <Button size={"small"} variant={"outlined"} style={{ color: 'orange', margin: '0px 10px 10px 5px' }} onClick={this.getDirection} >
                                                <FontAwesomeIcon
                                                    size='1x'
                                                    icon={"location-arrow"}
                                                />
                                                Get Direction
                                            </Button>
                                            <Button size={"small"} variant={"outlined"} style={{ color: 'orange', margin: '0px 5px 10px 10px' }} onClick={this.time}>Set Time</Button>
                                        </span>
                                        :
                                        null
                                }
                            </li>
                        })
                    }
                </ul>
                <br />

                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Set a meeting time</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                // defaultValue="2017-05-24T10:30"
                                // defaultValue={new Date().toString()}
                                onChange={this.pickTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.sendRequest} color="primary">
                                Send Request
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </div>
        )
    }
}


function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        meetingRequest: (meetUserObj, currentUserUID, meetingUserUID, currentUserObj) => {
            dispatch(meetingRequestAction(meetUserObj, currentUserUID, meetingUserUID, currentUserObj))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(MeetingPlace);