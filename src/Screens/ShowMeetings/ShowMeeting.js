import React, { Component } from 'react';
import { connect } from 'react-redux';

import PersistentDrawerLeft from '../Dashboard/Dashboard';
import MeetingRequest from '../MeetingRequest/MeetingRequest';
class ShowMeetings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestsArray: []
        }
    }

    static getDerivedStateFromProps(props) {
        const requestsArray = props.requestsArray;
        return ({ requestsArray })

    }


    render() {
        const { requestsArray } = this.state;
        console.log('requestsArray**********', requestsArray)
        return (
            <div>
                <PersistentDrawerLeft />
                <div style={{ display: 'flex', flexWrap: 'wrap', float: 'left', justifyContent: 'center', margin: '0px auto', width: '100%' }}>
                    {requestsArray.length ?
                        requestsArray.map(item => {
                            return <MeetingRequest item={item} />
                        })
                        :
                        <h2 style={{marginTop: '0px', color: '#034983'}} >No User Request</h2>
                    }
                </div>
            </div>
        )
    }
}

// export default ShowMeetings



function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
        requestsArray: state.root.requestsArray
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // meetingRequest: (meetUserObj, currentUserUID, meetingUserUID) => {
        //     dispatch(meetingRequestAction(meetUserObj, currentUserUID, meetingUserUID))
        // }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(ShowMeetings);