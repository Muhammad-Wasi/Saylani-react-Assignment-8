import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../Config/Firebase';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import History from '../../History'
import Image from '../../Assets/app-pic.jpg';
import Appbar from '../../Components/AppBar/Appbar';
import '../Dashboard/Dashboard.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faEdit, faAddressBook, faUserLock } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faUser, faUsers, faEdit, faAddressBook, faUserLock)

// import DashboardRouters from './DashboardRoutes';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class PersistentDrawerLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'Home'
        }

        this.pageChange = this.pageChange.bind(this)
        this.signout = this.signout.bind(this)


    }

    signout() {
        firebase.auth().signOut()
            .then(() => {
                console.log('Signed Out');
                const data =
                    History.push('/')
            }, (error) => {
                console.error('Sign Out Error', error);
            });
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    pageChange(path, text) {
        History.push(path);
        console.log('Text', path, text);
        this.setState({ text })
    }


    render() {
        const { classes, theme } = this.props;
        const { open, text } = this.state;
        console.log('Text', text);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color={"primary"}
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Appbar changeRoutes={this.changeRoutes} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <Avatar
                            className={'Avatar'}
                            alt="Adelle Charles"
                            src={Image}
                        />
                        <h3 className={"MeetHead"}>Meet Up</h3>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <List>
                        {[{ Text: 'Home', icon: "home", path: '/home' }, { Text: 'Meet up', icon: 'address-book', path: '/meetingcards' }, { Text: 'Request', icon: 'users', path: '/requests' }, { Text: "Edit Profile", icon: 'edit', path: '/editProfile' }].map((item, index) => (
                            <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                <FontAwesomeIcon
                                    size='2x'
                                    icon={item.icon}
                                />
                                <ListItemText primary={item.Text} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={this.signout} className={classes.listItem} key={'Log Out'}>
                            <FontAwesomeIcon
                                size='2x'
                                icon={"user-lock"}
                            />
                            <ListItemText primary={'Log Out'} />
                        </ListItem>
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                </main>
            </div >
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);