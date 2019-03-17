import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MeetingRequest.css';
import firebase from '../../Config/Firebase'
import History from '../../History';
import Example from '../../Components/Calender/Calender';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faMailBulk } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationArrow, faMailBulk)

class MeetingRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserImg: '',
            status: '',
        }
        this.Confirm = this.Confirm.bind(this);
        this.Cancle = this.Cancle.bind(this);
        this.getDirection = this.getDirection.bind(this)
        this.chat = this.chat.bind(this)

    }

    componentWillMount() {
        const { currentUser, item } = this.props;
        console.log('currentUser', currentUser);
        console.log('itemitem********', item);
        this.setState({ currentUserImg: currentUser.image1 })
    }

    componentDidMount() {
        const { currentUserUID, item } = this.props;
        firebase.database().ref(`/requests/${currentUserUID}/${item.userKey}/`).on('child_changed', snapshot => {
            console.log('Snapshot***', snapshot);
            console.log('SnapshotVal**', snapshot.val());
            this.setState({ status: snapshot.val() })
            console.log('SnapshotKey******', snapshot.key);

        })
    }

    Confirm(uid) {
        const { currentUserUID } = this.props;
        firebase.database().ref(`/meetings/${uid}/${currentUserUID}/status/`).set('Accepted')
        firebase.database().ref(`/requests/${currentUserUID}/${uid}/status/`).set('Accepted')
    }

    Cancle(uid) {
        console.log('uid******', uid)
        const { currentUserUID } = this.props;
        firebase.database().ref(`/meetings/${uid}/${currentUserUID}/status/`).set('Cancelled')
        firebase.database().ref(`/requests/${currentUserUID}/${uid}/status/`).set('Cancelled')
    }


    getDirection() {
        const { item } = this.props;
        console.log('Location********', item)
        const userDataObj = { ...item.userData, path: '/requests' }
        History.push({
            pathname: '/direction',
            state: userDataObj
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
        // currentUserUID: state.root.currentUserUID,
        const { item } = this.props;
        const { currentUserImg, status } = this.state;

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={'RequestCards'}>
                    <div className={'RequestCardsDiv1'}>
                        <Avatar
                            className={'LeftAvatar'}
                            alt="Adelle Charles"
                            src={currentUserImg}
                        />
                        <Avatar
                            className={'RightAvatar'}
                            alt="Adelle Charles"
                            src={item.userData.image1}
                        />
                    </div>
                    <div className={'RequestCardsDiv2'}>
                        <h3>{item.userData.name}</h3>
                        {
                            item.userData.time1 ?
                                <p>{item.userData.time1} minutes</p>
                                :
                                <span>
                                    {
                                        item.userData.time2 ?
                                            <p>{item.userData.time2} minutes</p>
                                            :
                                            <p>{item.userData.time3} minutes</p>
                                    }
                                </span>

                        }
                        <p>{item.userData.time}</p>
                        <p>{item.userData.address}</p>
                        <Button size={"small"} variant={"outlined"} color={"primary"} onClick={this.getDirection} >
                            <FontAwesomeIcon
                                size='1x'
                                icon={"location-arrow"}
                            />
                            Get Direction Button
                        </Button>
                        <br />
                        {
                            status ?
                                <span>
                                    {
                                        status === "Pending" ?
                                            <span>
                                                <Button size={"small"} variant={"outlined"} color={"primary"} onClick={() => this.Confirm(item.userKey)} >Confirm</Button>
                                                <Button size={"small"} variant={"outlined"} color={"secondary"} onClick={() => this.Cancle(item.userKey)}>Cancle</Button>
                                            </span>
                                            :
                                            <span>
                                                <h3>{status}</h3>
                                                {
                                                    status === "Accepted" ?
                                                        <Button
                                                            onClick={() => this.chat(item.userKey)}
                                                            // onClick={() => { History.push({ pathname: '/message', state: item.userKey }) }}
                                                            size={"small"} color={"primary"} variant={"outlined"}
                                                        >
                                                            <FontAwesomeIcon
                                                                size='1x'
                                                                icon={"mail-bulk"}
                                                            />
                                                            Chat
                                                        </Button>
                                                        :
                                                        null
                                                }
                                            </span>
                                    }
                                </span>
                                :
                                <span>
                                    {
                                        item.userData.status === "Pending" ?
                                            <span>
                                                <Button size={"small"} variant={"outlined"} color={"primary"} onClick={() => this.Confirm(item.userKey)} >Confirm</Button>
                                                <Button size={"small"} variant={"outlined"} color={"secondary"} onClick={() => this.Cancle(item.userKey)}>Cancle</Button>
                                            </span>
                                            :
                                            <span>
                                                <h3>{item.userData.status}</h3>
                                                {
                                                    item.userData.status === "Accepted" ?
                                                        // <Example />
                                                        <Button
                                                            onClick={() => this.chat(item.userKey)}

                                                            //  onClick={() => { History.push('/message') }}
                                                            size={"small"} color={"primary"} variant={"outlined"}>
                                                            <FontAwesomeIcon
                                                                size='1x'
                                                                icon={"mail-bulk"}
                                                            />
                                                            Chat
                                                        </Button>
                                                        :
                                                        null
                                                }
                                            </span>
                                    }
                                </span>
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

export default connect(mapStateToProp, null)(MeetingRequest);