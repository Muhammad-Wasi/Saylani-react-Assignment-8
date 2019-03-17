import ActionTypes from '../Constant/Constant';
import History from '../../History';
import firebase from '../../Config/Firebase';
import { SwipeableDrawer } from '@material-ui/core';
import swal from 'sweetalert2';
import { func } from 'prop-types';

const db = firebase.database();

export function usersUIDArray() {
    return dispatch => {
        swal.showLoading();
        var currentUserUID;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                currentUserUID = user.uid;
                dispatch({ type: ActionTypes.CURRENTUSERUID, payload: uid })
                let allUsersUIDArray = []


                // const userObj = {
                //     name: user.displayName,
                //     email: user.email,
                //     photo: user.photoURL,
                // }
                // console.log('userObj', userObj)
                // dispatch({ type: ActionTypes.CURRENTUSER, payload: userObj })

                let userDataArray = [];
                let unlikeArray = [];
                let meetingsArray = [];
                let requestsArray = [];

                db.ref('users/').on('child_added', snapshot => {
                    console.log('SnapshotVal', snapshot.val())
                    console.log('snapshotkey', snapshot.key)
                    if (!snapshot.val()) {
                        console.log('SnapshotVal************', snapshot.val())
                        History.push('/personaldata')
                    }
                    else {

                        allUsersUIDArray.push(snapshot.key);
                        if (snapshot.key === uid) {
                            let userDetails = snapshot.val();
                            console.log('****************snapshot.val()', userDetails)
                            dispatch({ type: ActionTypes.CURRENTUSER, payload: userDetails })
                            History.push('/home')
                        }
                        else {
                            const userDetail = {
                                userKey: snapshot.key,
                                userData: snapshot.val()
                            }
                            // const userObj = {
                            //     name: user.displayName,
                            //     email: user.email,
                            //     photo: user.photoURL,
                            // }
                            // console.log('userObj', userObj)
                            // dispatch({ type: ActionTypes.CURRENTUSER, payload: userObj })
                            // History.push('/personaldata')
                            userDataArray.push(userDetail)
                            console.log('userDataArray', userDataArray)

                            dispatch({ type: ActionTypes.USERDATAARRAY, payload: userDataArray })

                        }
                    }
                    // console.log('allUsersUIDArray', allUsersUIDArray);
                    dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersUIDArray })
                })
                var count = 0;
                db.ref(`unlike/${uid}/`).on('child_added', snapUID => {
                    console.log('UNLIKE*************', snapUID.key)
                    unlikeArray.push(snapUID.key);
                    count = count + 1
                    dispatch({ type: ActionTypes.UNLIKEARRAY, payload: unlikeArray })
                    dispatch({ type: ActionTypes.CHANGES, payload: count })
                })
                db.ref(`meetings/${uid}/`).on('child_added', snapMeets => {
                    console.log('meetings*************', snapMeets.key, snapMeets.val())
                    const obj = {
                        userKey: snapMeets.key,
                        userData: snapMeets.val()
                    }
                    meetingsArray.push(obj);
                    console.log('meetingsArray', meetingsArray)
                    count = count + 1
                    dispatch({ type: ActionTypes.MEETINGSARRAY, payload: meetingsArray })
                    dispatch({ type: ActionTypes.CHANGES, payload: count })
                })
                db.ref(`requests/${uid}/`).on('child_added', snapReq => {
                    console.log('requests*************', snapReq.key, snapReq.val())
                    const obj = {
                        userKey: snapReq.key,
                        userData: snapReq.val()
                    }
                    requestsArray.push(obj);
                    count = count + 1
                    dispatch({ type: ActionTypes.REQUESTSARRAY, payload: requestsArray })
                    dispatch({ type: ActionTypes.CHANGES, payload: count })
                })


                // ...
            } else {
                // User is signed out.
                let allUsersUIDArray = []
                db.ref('users/').on('child_added', snapshot => {
                    console.log('snapshotkey', snapshot.key)
                    allUsersUIDArray.push(snapshot.key);
                    console.log('allUsersUIDArray', allUsersUIDArray);
                    dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersUIDArray })
                })
                console.log('SIGNOUT***')
                // ...
            }
        });

        // db.ref('users/').on('child_added', snap => {
        //     console.log('Snapshot', snap.val())
        //     console.log('Snapshot', snap.key)


        // })

    }
}

export function checkuserAction(userUID, usersUIDArray, currentUserObj) {
    return dispatch => {
        console.log('userUID, usersUIDArray', userUID, usersUIDArray, currentUserObj)

        if (usersUIDArray && usersUIDArray.length && usersUIDArray.indexOf(userUID) != -1) {
            console.log('done***', userUID)
            History.push('/home')
        }
        else {
            // History.push('/personaldata')
            console.log('Not Done')
        }
    }
}

export function currentUserUID(userUID) {
    return dispatch => {
        dispatch({ type: ActionTypes.CURRENTUSERUID, payload: userUID })
        console.log('userUID', userUID)
    }
}

export function datastoredAction(currentUser) {
    return dispatch => {
        // swal.showLoading()
        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
        console.log('currentUser****', currentUser)
    }
}



export function datastoredinfirebaseAction(currentUserUID, currentUserData) {
    return dispatch => {
        console.log('currentUserUID', currentUserUID)
        console.log('currentUserData', currentUserData)
        if (Object.keys(currentUserData).length == 16) {
            const db = firebase.database();
            db.ref('users/' + currentUserUID + '/').set(currentUserData)
                .then(() => {
                    History.push('/home')
                    console.log('success*****')
                })
        }
        else {
            if (Object.keys(currentUserData).indexOf('nickname') == -1) {
                History.push('/personaldata')
            }
            else if (Object.keys(currentUserData).indexOf('image1') == -1) {
                History.push('/uploadimages')
            }
            else if (Object.keys(currentUserData).indexOf('beverage1') == -1) {
                History.push('/profile')
            }
        }
    }
}


export function meetingRequestAction(meetingObj, currentUserUID, meetingUserUID, currentUserObj) {
    return dispatch => {
        if (meetingObj.time) {
            db.ref(`unlike/${currentUserUID}/${meetingUserUID}`).set(true)
            db.ref(`/meetings/${currentUserUID}/${meetingUserUID}/`).set(meetingObj)
            db.ref(`/requests/${meetingUserUID}/${currentUserUID}/`).set(currentUserObj)

            swal({
                type: 'success',
                title: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                History.push('/home')
            }, 1500)
        }
        else {
            swal({
                type: 'error',
                text: 'Set meeting time please!!!'
            })
        }

    }
}