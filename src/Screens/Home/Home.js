import React, { Component } from 'react';
import geolib from 'geolib'
import { connect } from 'react-redux';
import History from '../../History';
import swal from 'sweetalert2';
import PersistentDrawerLeft from '../Dashboard/Dashboard';
import MeetingStatus from '../AllMeetings/Meetings';
import MeetingRequest from '../MeetingRequest/MeetingRequest';
import './Home.css'
import { Button } from '@material-ui/core';
import { auth } from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
library.add(faUsers)


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayLength: 0,
            meetingsArray: [],
            currentUserData: null,
            userDataArray: null
        }
    }

    static getDerivedStateFromProps(props) {
        const meetingsArray = props.meetingsArray;
        return ({ meetingsArray: meetingsArray })

    }

    render() {
        const { data, meetingsArray } = this.state;
        console.log('************meetingsArray', meetingsArray)

        console.log('data******', data)
        return (
            <div>
                <PersistentDrawerLeft />
                <div className={'AllMeetingsCards'}>
                    {meetingsArray.length ?
                        meetingsArray.map(item => {
                            return <MeetingStatus user={item} />
                        })
                        :
                        <span>
                            <h2>You haven’t done any meeting yet!</h2>
                            <Button size={"large"} variant={"outlined"} style={{ color: 'orange' }} onClick={() => { History.push('/meetingcards') }}>
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={"users"}
                                    style={{ marginRight: '5px' }}
                                />
                                Set a meeting!
                            </Button>
                        </span>
                    }
                </div>
            </div>
        )
    }
}


function mapStateToProp(state) {
    return ({
        usersUIDArray: state.root.users,
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
        userDataArray: state.root.userDataArray,
        unlikeArray: state.root.unlikeArray,
        meetingsArray: state.root.meetingsArray,
        Condition: state.root.Condition
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // usersUID: () => {
        //     dispatch(usersUIDArray())
        // }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);
