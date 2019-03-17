import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import History from '../../History';
import Navbar from '../Navbar/Navbar';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h2>You haven’t done any meeting yet!</h2>
                <Button variant={"outlined"} color={"primary"} onClick={() => { History.push('/home') }}>Set a meeting</Button>
            </div>
        )
    }
}

export default Dashboard;