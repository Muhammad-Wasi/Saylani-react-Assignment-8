import React, { Component } from 'react';
import { datastoredAction, checkuserAction } from '../../Store/Action/Action';
import History from '../../History';
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase';
import { AppBar, Button, TextField } from '@material-ui/core';
import swal from 'sweetalert2';

class PersonalData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            number: ''
        }

        this.nickname = this.nickname.bind(this);
        this.number = this.number.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillMount() {
        const { currentUserUID, usersUIDArray, currentUserObj } = this.props;
        console.log('currentUserUID, usersUIDArray', currentUserUID, usersUIDArray)
        this.props.checkuser(currentUserUID, usersUIDArray, currentUserObj)
        //     setTimeout(() => {
        //         let userArray = this.props.allUsersUIDArray;
        //         let currentUserObj = this.props.currentUserObj;
        //         this.props.checkingUser(userArray, currentUserObj);
        //     }, 6000)

    }

    nickname(e) {
        this.setState({ nickname: e.target.value })
    }

    number(e) {
        this.setState({ number: e.target.value })
    }

    submit() {
        const { nickname, number } = this.state;
        const db = firebase.database();
        let that = this;
        // const userUID = firebase.auth().currentUser.uid;
        if (nickname.length < 4) {
            swal({
                title: 'error',
                title: 'Nickname is too short'
            })
        }
        else if (!(/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(number))) {
            swal({
                title: 'error',
                title: 'Fill the correct phone number'
            })
        }
        else {
            let currentUserObj = { nickname, number, ...that.props.currentUserObj }
            that.props.currentUserData(currentUserObj)
            History.push('/uploadimages')
        }
    }

    render() {
        const { nickname, number } = this.state;
        return (
            <div>
                <AppBar position="static" color="primary" style={{ height: '80px', textAlign: 'center' }}>
                    <h1>Personal Data</h1>
                </AppBar>
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
                <Button variant={"outlined"} color={"primary"} onClick={this.submit}>Next</Button>


            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUserObj: state.root.currentUser,
        usersUIDArray: state.root.users,
        currentUserUID: state.root.currentUserUID,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        currentUserData: (currentUserObj) => {
            dispatch(datastoredAction(currentUserObj));
        },
        checkuser: (userUID, usersUIDArray, currentUserObj) => {
            dispatch(checkuserAction(userUID, usersUIDArray, currentUserObj));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(PersonalData);