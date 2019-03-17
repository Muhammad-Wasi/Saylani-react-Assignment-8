import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History';
import firebase from '../../Config/Firebase'
import { stat } from 'fs';
import PersistentDrawerLeft from '../../Screens/Dashboard/Dashboard';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        console.log('Props*******', this.props)
    }

    render() {

        return (
            <div>
                <PersistentDrawerLeft />
                <h1>
                    chat
                </h1>
            </div>
        )
    }
}


export default Chat