import React, { Component } from 'react';
import firebase from '../../Config/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { connect } from 'react-redux';
import { currentUserUID, datastoredAction } from '../../Store/Action/Action';
import History from '../../History';
import swal from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        setTimeout(() => {
            swal({
                showConfirmButton: false,
                timer: 10
            })
        }, 1500)
    }

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebase.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (success) => {
                let userArray = this.props.allUsersUIDArray;
                console.log('userArray', userArray)
                let that = this;
                const db = firebase.database();
                // console.log('success', success)
                const user = success.user;
                const userUID = user.uid;
                this.props.currentUserUID(userUID)
                console.log('User***', userUID)
                if (userArray.length && userArray.indexOf(user.uid) !== -1) {
                    swal({
                        title: 'success',
                        text: 'Successfully Login',
                        timer: 1500
                    })
                    setTimeout(() => {
                        History.push('/home')
                    }, 1500)

                }
                else {
                    const userObj = {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                    }
                    that.props.datastoredAction(userObj)
                    History.push('/personaldata')
                }
            }
        }
    };

    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )
    }

}

function mapStateToProp(state) {
    return ({
        allUsersUIDArray: state.root.users,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        currentUserUID: (userUID) => {
            dispatch(currentUserUID(userUID));
        },
        datastoredAction: (currentUser) => {
            dispatch(datastoredAction(currentUser))
        }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);