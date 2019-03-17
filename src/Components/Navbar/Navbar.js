import React, { Component } from 'react';
// import { signinAction, facebooksigninAction, googlesigninAction } from '../../Store/Action/action';
import { connect } from 'react-redux';
import History from '../../History';
import { AppBar, Button, Toolbar, IconButton, Typography, MenuIcon, MenuItem } from '@material-ui/core';
import '../../App.css';
import firebase from 'firebase';
import swal from 'sweetalert2';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                console.log('Sign Out*****')
                History.push('/')
            })
    }


    render() {
        return (
            <div>
                <AppBar position="static" className="HomeBar" style={{ backgroundColor: "rgb(34, 157, 179)", height: '70px' }}>
                    <div className="MainDiv">
                        <div style={{ float: 'left', padding: '10px' }} className="image">
                            {/* {userDataObj && userDataObj.photo ?
                                <img alt="User Profile Picture..." src={userDataObj.photo} style={{ width: '60px', height: '60px', borderRadius: '60px' }} />
                                : */}
                            <img alt="User Profile Picture..." src="https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif" style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                            {/* } */}
                        </div>
                        <div className="Heading">
                            <b>Meeting App</b>
                        </div>
                        <div className="Button">
                            <Button color={"secondary"} size={"small"} style={{ backgroundColor: 'white', float: "right", marginRight: '7px' }} onClick={this.logout.bind(this)} >LogOut</Button>
                        </div>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default Navbar

// function mapStateToProps(state) {
//     return ({
//         user: state.root.user,
//     })
// }

// function mapDispatchToProps(dispatch) {
//     return ({
//         // changeStateToReducer: (userDataObj) => {
//         //     dispatch(changeState(userDataObj));
//         // }
//     })
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
