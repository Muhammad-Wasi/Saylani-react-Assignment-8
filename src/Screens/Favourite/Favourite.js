import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History';
import { datastoredAction, checkuserAction } from '../../Store/Action/Action';
import { Button, AppBar, Checkbox } from '@material-ui/core';

class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedF: false,
            coffee: '',
            juice: '',
            cocktail: '',
            timeA: '',
            timeB: '',
            timeC: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        const { currentUserUID, usersUIDArray, currentUserObj } = this.props;
        console.log('currentUserUID, usersUIDArray', currentUserUID, usersUIDArray)
        this.props.checkuser(currentUserUID, usersUIDArray, currentUserObj)
    }

    handleChange(e) {
        const { checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, timeA, timeB, timeC } = this.state;
        console.log('Values', e.target.value)
        const value = e.target.value
        if ('coffee' === value) {
            if (!checkedA) {
                this.setState({
                    checkedA: !checkedA,
                    coffee: value
                })
            }
            else {
                this.setState({
                    checkedA: !checkedA,
                    coffee: ""
                })
            }
        }
        else if ('juice' === value) {
            if (!checkedB) {
                this.setState({
                    checkedB: !checkedB,
                    coffee: value
                })
            }
            else {
                this.setState({
                    checkedB: !checkedB,
                    coffee: ""
                })
            }
        }
        else if ('cocktail' === value) {
            if (!checkedC) {
                this.setState({
                    checkedC: !checkedC,
                    cocktail: value
                })
            }
            else {
                this.setState({
                    checkedC: !checkedC,
                    cocktail: ""
                })
            }
        }
        else if ('30' == value) {
            this.setState({
                checkedD: !checkedD,
            }, () => {
                if (this.state.checkedA) {
                    this.setState({
                        timeA: value
                    })
                }
                else {
                    this.setState({
                        timeA: ""
                    })
                }
            })
        }
        else if ('60' == value) {
            this.setState({
                checkedE: !checkedE,
            }, () => {
                if (this.state.checkedA) {
                    this.setState({
                        timeB: value
                    })
                }
                else {
                    this.setState({
                        timeB: ""
                    })
                }
            })
        }
        else if ('120' == value) {
            this.setState({
                checkedF: !checkedF,
            }, () => {
                if (this.state.checkedA) {
                    this.setState({
                        timeC: value
                    })
                }
                else {
                    this.setState({
                        timeC: ""
                    })
                }
            })
        }
    }

    next() {
        const { checkedA, checkedB, checkedC, coffee, juice, cocktail, checkedD, checkedE, checkedF, timeA, timeB, timeC } = this.state;
        if ((checkedA || checkedB || checkedC) && (checkedD || checkedE || checkedF)) {
            const userProfile = {
                beverage1: coffee,
                beverage2: juice,
                beverage3: cocktail,
                time1: timeA,
                time2: timeB,
                time3: timeC
            }

            let currentUserObj = { ...userProfile, ...this.props.currentUserObj }
            this.props.currentUserData(currentUserObj)
            History.push('/googlemap');
        }
        else {
            alert('Select One Option From Both')
        }
    }

    render() {
        const { checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, timeA, timeB, timeC } = this.state;
        return (
            <div>
                <AppBar position="static" color="primary" className="HomeBar" style={{ height: '80px', textAlign: 'center' }}>
                    <h1>Profile</h1>
                </AppBar>
                <div>
                    <h2 style={{ fontFamily: 'cambria' }}>Choose Beverages</h2>
                    <Checkbox
                        checked={checkedA}
                        onChange={this.handleChange}
                        value="coffee"
                        color="primary"
                    />Coffee
                    <Checkbox
                        checked={checkedB}
                        onChange={this.handleChange}
                        value="juice"
                        color="primary"
                    />Juice
                    <Checkbox
                        checked={checkedC}
                        onChange={this.handleChange}
                        value="cocktail"
                        color="primary"
                    />Cocktail
                    <br />
                    <h2 style={{ fontFamily: 'cambria' }}>Choose Time Duration</h2>
                    <Checkbox
                        checked={checkedD}
                        onChange={this.handleChange}
                        value="30"
                        color="primary"
                    />30 min
                    <Checkbox
                        checked={checkedE}
                        onChange={this.handleChange}
                        value="60"
                        color="primary"
                    />60 min
                    <Checkbox
                        checked={checkedF}
                        onChange={this.handleChange}
                        value="120"
                        color="primary"
                    />120 min
                    <br />
                    <Button variant={"outlined"} color={"primary"} onClick={this.next}>Next</Button>
                </div>
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
        currentUserData: (userArray) => {
            dispatch(datastoredAction(userArray));
        },
        checkuser: (userUID, usersUIDArray, currentUserObj) => {
            dispatch(checkuserAction(userUID, usersUIDArray, currentUserObj));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Favourite);