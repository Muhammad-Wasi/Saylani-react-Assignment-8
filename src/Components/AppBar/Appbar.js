import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import '../AppBar/Appbar.css'
import History from '../../History';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faUserLock } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faUsers, faUserLock)

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            notification: null,
            request: null
        }

        this.Signout = this.Signout.bind(this);

    }

    componentWillMount() {
        const { meetingsArray, requestsArray, Condition } = this.props;
        console.log(Number(meetingsArray.length));
        console.log(Number(requestsArray.length));
        const notifi = Number(meetingsArray.length);
        const requ = Number(requestsArray.length);

        this.setState({
            notification: notifi,
            request: requ
        })
    }

    componentWillReceiveProps() {
        const { meetingsArray, requestsArray, Condition } = this.props;
        console.log(Number(meetingsArray.length));
        console.log(Number(requestsArray.length));
        const notifi = Number(meetingsArray.length);
        const requ = Number(requestsArray.length);

        this.setState({
            notification: notifi,
            request: requ
        })
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    Signout() {
        firebase.auth().signOut().then(() => {
            console.log('Signed Out');
            const data =
                History.push('/')
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }


    render() {
        // console.log('History******', props.History)
        const { anchorEl, mobileMoreAnchorEl, notification, request } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        console.log('notification', notification);
        console.log('request', request);
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={() => { this.props.changeRoutes({ path: '/editprofile' }) }}>Edit Profile</MenuItem>
                <MenuItem onClick={() => { this.props.changeRoutes({ path: '/logout' }) }}>Log out</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={() => { History.push('/requests') }}>
                    <IconButton color="inherit">
                        {
                            request ?
                                <Badge badgeContent={request} color="secondary">
                                    <FontAwesomeIcon
                                        size='1x'
                                        icon={"users"}
                                    />
                                </Badge>
                                :
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={"users"}
                                />
                        }
                    </IconButton>
                    <p className={'MenuText'}>Request</p>
                </MenuItem>
                <MenuItem onClick={() => { History.push('/meetingcards') }}>
                    <IconButton color="inherit">
                        {
                            notification ?
                                <Badge badgeContent={notification} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                                :
                                <NotificationsIcon />

                        }
                    </IconButton>
                    <p className={'MenuText'}>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.Signout}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p className={'MenuText'}>Log Out</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton color="inherit" onClick={() => { History.push('/requests') }}>
                        {
                            request ?
                                <Badge badgeContent={request} color="secondary">
                                    <FontAwesomeIcon
                                        size='1x'
                                        icon={"users"}
                                    />
                                </Badge>
                                :
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={"users"}
                                />
                        }
                    </IconButton>
                    <IconButton color="inherit" onClick={() => { History.push('/home') }}>
                        {
                            notification ?
                                <Badge badgeContent={notification} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                                :
                                <NotificationsIcon />
                        }
                    </IconButton>
                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.Signout}
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                        <MoreIcon />
                    </IconButton>
                </div>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

Appbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Appbar);


function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
        requestsArray: state.root.requestsArray,
        meetingsArray: state.root.meetingsArray,
        Condition: state.root.Condition
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // meetingRequest: (meetingObj, currentUserUID, meetingUserUID) => {
        //     dispatch(meetingRequestAction(meetingObj, currentUserUID, meetingUserUID))
        // }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(Appbar));