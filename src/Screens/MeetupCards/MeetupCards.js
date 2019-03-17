import React, { Component } from 'react';
import geolib from 'geolib'
import Cards, { Card } from 'react-swipe-deck';
// import Swing from 'react-swing';
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase';
import History from '../../History';
import swal from 'sweetalert2';
import CardDiv from '../../Components/Card/Card';
import PersistentDrawerLeft from '../Dashboard/Dashboard';
import './MeetingCard.css'

class MeetUpCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arrayLength: 0,
            currentUserData: null,
            userDataArray: null
        }
        this.leftSwipe = this.leftSwipe.bind(this);
        this.rightSwipe = this.rightSwipe.bind(this);

    }

    componentWillMount() {
        // swal.showLoading()
        let that = this;
        const { userDataArray, currentUser, unlikeArray } = this.props;
        console.log('currentUser****', unlikeArray)

        if (currentUser.latitude) {
            const lat = currentUser.latitude
            const lon = currentUser.longitude
            if (this.state.arrayLength != userDataArray.length) {
                that.setState({
                    arrayLength: userDataArray.length
                })
                const userData = []
                userDataArray.map(item => {
                    if (unlikeArray.indexOf(item.userKey) == -1) {

                        console.log('item*********', item)
                        if (geolib.isPointInCircle(
                            { latitude: item.userData.latitude, longitude: item.userData.longitude },
                            { latitude: lat, longitude: lon },
                            1000000
                        )) {
                            if (((currentUser.beverage1 && item.userData.beverage1) ||
                                (currentUser.beverage2 && item.userData.beverage2) ||
                                (currentUser.beverage3 && item.userData.beverage3)) &&
                                ((currentUser.time1 && item.userData.time1) ||
                                    (currentUser.time2 && item.userData.time2) ||
                                    (currentUser.time3 && item.userData.time3))) {
                                console.log('Mil Gaya')
                                userData.push(item)
                                that.setState({ data: userData })
                            }
                            else {
                                console.log('Nahi Milaa')
                            }
                        }
                    }
                    else {
                        console.log('Nahi Milaa***********')
                    }
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        setTimeout(() => {
            const userDataArray = nextProps.userDataArray;
            const currentUser = nextProps.currentUser;
            const unlikeArray = nextProps.unlikeArray;
            console.log('currentUser****', unlikeArray)
            if (currentUser.latitude) {
                const lat = currentUser.latitude
                const lon = currentUser.longitude
                if (this.state.arrayLength != userDataArray.length) {
                    that.setState({
                        arrayLength: userDataArray.length
                    })
                    const userData = []
                    userDataArray.map(item => {
                        if (unlikeArray.indexOf(item.userKey) == -1) {
                            console.log('item*********', item)
                            if (geolib.isPointInCircle(
                                { latitude: item.userData.latitude, longitude: item.userData.longitude },
                                { latitude: lat, longitude: lon },
                                1000000
                            )) {
                                if (((currentUser.beverage1 && item.userData.beverage1) ||
                                    (currentUser.beverage2 && item.userData.beverage2) ||
                                    (currentUser.beverage3 && item.userData.beverage3)) &&
                                    ((currentUser.time1 && item.userData.time1) ||
                                        (currentUser.time2 && item.userData.time2) ||
                                        (currentUser.time3 && item.userData.time3))) {
                                    console.log('Mil Gaya')
                                    userData.push(item)
                                    that.setState({ data: userData })
                                }
                                else {
                                    console.log('Nahi Milaa')
                                }

                            }
                            else {
                                console.log('Nahi Milaa***********')
                            }
                        }
                    })
                }
                swal({
                    timer: 1,
                    showConfirmButton: false
                })
            }
        }, 1)
    }

    leftSwipe(userKey) {
        const { currentUserUID } = this.props;
        console.log('leftSwipe', userKey)
        firebase.database().ref(`unlike/${currentUserUID}/${userKey}`).set(true)
    }

    rightSwipe(userKey, index) {
        const { currentUserUID } = this.props;
        const { data } = this.state
        console.log('rightSwipe', userKey)
        swal({
            title: 'info',
            titleText: `Do you want to meet ${data[index].userData.name}?`,
            confirmButtonText: 'Yes!',
            showCancelButton: true,
            cancelButtonText: 'No!'
        })
            .then((result) => {
                if (result.value) {
                    History.push({
                        pathname: '/meetingPlace',
                        state: { userKey: userKey, userData: data[index].userData }
                    })
                    console.log('YEs!!!!!')
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                ) {
                    console.log('No!!!!!')
                    firebase.database().ref(`unlike/${currentUserUID}/${userKey}`).set(true)

                }
            })
    }


    render() {
        const { data } = this.state;
        console.log('data******', data)
        return (
            <div>
                <PersistentDrawerLeft />
                {
                    data.length ?

                        <Cards className="CardDiv" cardSize={[300, 420]} size={['auto', 440]} style={{ left: '0%', border: '1px solid black', borderRadius: '5px' }} onEnd={() => alert('end')} className='master-root' style={{ width: '310px', height: '320px', border: '1px solid black', borderRadius: '5px' }}>
                            {data.map((item, index) =>
                                <Card className="Cards" style={{ left: '0%', top: '0%' }}
                                    onSwipeLeft={() => this.leftSwipe(item.userKey)}
                                    onSwipeRight={() => this.rightSwipe(item.userKey, index, item)}>
                                    <CardDiv item={item.userData} />
                                </Card>
                            )}
                        </Cards>
                        :
                        <div>
                            <h2 style={{ marginTop: '0px', color: '#034983' }} >No User Available</h2>
                        </div>
                }
            </div>
        )
    }

}


function mapStateToProp(state) {
    return ({
        usersUIDArray: state.root.users,
        currentUser: state.root.currentUser,
        currentUserUID: state.root.currentUserUID,
        userDataArray: state.root.userDataArray,
        unlikeArray: state.root.unlikeArray,
        meetingsArray: state.root.meetingsArray,
        Condition: state.root.Condition
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // usersUID: () => {
        //     dispatch(usersUIDArray())
        // }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(MeetUpCard);
