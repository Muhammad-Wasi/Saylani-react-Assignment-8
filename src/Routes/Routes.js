import React, { Component } from 'react';
import firebase from '../Config/Firebase'
import { Router, Route, Link } from "react-router-dom";
import history from '../History';
import { connect } from 'react-redux';
import { usersUIDArray } from '../Store/Action/Action';

import Login from '../Screens/Login/Login';
import Favourite from '../Screens/Favourite/Favourite';
import SimpleMap from '../Screens/GoogleMap/Map';
import PersonalData from '../Screens/PersonalData/Data';
import PictureUpload from '../Screens/UserPictures/Pictures';
import Home from '../Screens/Home/Home';
import Dashboard from '../Components/Dashboard/Dashboard';
import CardDiv from '../Components/Card/Card';
import MeetingPlace from '../Screens/MeetingPlace/MeetingPlace';
import EditProfile from '../Screens/EditProfile/EditProfile';
import MeetupCards from '../Screens/MeetupCards/MeetupCards';
import { Direction } from 'swing';
import Directions from '../Screens/Direction/Direction';
import ShowMeetings from '../Screens/ShowMeetings/ShowMeeting';
import Chat from '../Components/Chat/Chat';


class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.props.usersUID();
    }
    render() {
        console.log('UserList***', this.state.userList)
        const { userList } = this.state;
        return (
            <Router history={history}>
                <div style={{ textAlign: 'center' }}>
                    <Route exact path={'/'} component={Login} />
                    <Route path={'/profile'} component={Favourite} />
                    <Route path={'/googlemap'} component={SimpleMap} />
                    <Route path={'/personaldata'} component={PersonalData} />
                    <Route path={'/uploadimages'} component={PictureUpload} />
                    <Route path={'/home'} component={Home} />
                    <Route path={'/dashboard'} component={Dashboard} />
                    <Route path={'/meetingcards'} component={MeetupCards} />
                    <Route path={'/meetingPlace'} component={MeetingPlace} />
                    {/* <Route path={'/direction'} component={Directions} /> */}
                    <Route path={'/editProfile'} component={EditProfile} />
                    <Route path={'/direction'} component={Directions} />
                    <Route path={'/requests'} component={ShowMeetings} />
                    <Route path={'/message'} component={Chat} />
                </div>
            </Router>
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        usersUID: () => {
            dispatch(usersUIDArray())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Routes);
