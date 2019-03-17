import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase'
import './Meetings.css';
import { Button } from '@material-ui/core';
import Slideshow from '../../Components/ImageSlider/ImageSlider';
import Example from '../../Components/Calender/Calender';
import History from '../../History';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faMailBulk } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationArrow, faMailBulk)

class MeetingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }

        this.chat = this.chat.bind(this)
    }


    componentWillMount() {
        const { user } = this.props
        this.setState({ status: user.userData.status })
    }

    componentDidMount() {
        const { currentUserUID, user } = this.props;
        firebase.database().ref(`/meetings/${currentUserUID}/${user.userKey}/`).on('child_changed', snapshot => {
            console.log('Snapshot***', snapshot);
            console.log('SnapshotVal**', snapshot.val());
            this.setState({ status: snapshot.val() })
            console.log('SnapshotKey******', snapshot.key);
        })
    }

    chat(uid) {
        console.log('UID***', uid)
        History.push({
            pathname: '/message',
            state: { uid }
        })
    }

    render() {
        const { user } = this.props;
        const { status } = this.state;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={'MeetingsCards'}>
                    <div className={'Div1'}>
                        <img src={user.userData.image1} />
                    </div>
                    <div className={'Div2'}>
                        <h3>{user.userData.name}</h3>
                        <h5>{user.userData.time}</h5>
                        <h5>{user.userData.address}</h5>
                        <h3>{status}</h3>
                        {
                            status === 'Accepted' ?
                                <Button
                                    onClick={() => this.chat(user.userKey)}

                                    // onClick={() => { History.push({ pathname: '/message', state: user.userKey }) }}
                                    size={"small"} color={"primary"} variant={"outlined"}
                                >
                                    <FontAwesomeIcon
                                        size='1x'
                                        icon={"mail-bulk"}
                                    />
                                    Chat
                                </Button>
                                // <Example item={user.userData} />
                                :
                                null
                        }
                    </div>
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

export default connect(mapStateToProp, null)(MeetingStatus);