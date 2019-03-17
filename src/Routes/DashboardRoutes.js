import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import history from '../History';
import { connect } from 'react-redux';
import { usersUIDArray } from '../Store/Action/Action';

import Home from '../Screens/Home/Home';
import Dashboard from '../Components/Dashboard/Dashboard';
import MeetingPlace from '../Screens/MeetingPlace/MeetingPlace';
import MeetUpCard from '../Screens/MeetupCards/MeetupCards';
import TextMobileStepper from '../Screens/EditProfile/EditProfile';
// import Directions from '../Screens/Direction/Direction';


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
                    {/* <Route path={'/home'} component={Home} /> */}
                    <Route path={'/dashboard'} component={Dashboard} />
                    <Route path={'/meetingPlace'} component={MeetingPlace} />
                    <Route path={'/meetup'} component={MeetUpCard} />
                    <Route path={'/home'} component={MeetUpCard} />
                    <Route path={'/editprofile'} component={TextMobileStepper} />

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
