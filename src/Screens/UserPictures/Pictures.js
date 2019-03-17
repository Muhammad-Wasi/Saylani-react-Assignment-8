import React, { Component } from 'react';
import History from '../../History';
import { connect } from 'react-redux';
import { datastoredAction, checkuserAction } from '../../Store/Action/Action';
import { AppBar, Button, TextField, Input } from '@material-ui/core';
import swal from 'sweetalert2';

class UploadPictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image1: '',
            image2: '',
            image3: '',
        }

        this.uploadimage = this.uploadimage.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const { currentUserUID, usersUIDArray, currentUserObj } = this.props;
        console.log('currentUserUID, usersUIDArray', currentUserUID, usersUIDArray)
        this.props.checkuser(currentUserUID, usersUIDArray, currentUserObj)
    }

    uploadimage(index) {
        let that = this;
        var file = document.getElementsByName('file')[index].files[0]; //sames as here
        var reader = new FileReader();

        reader.addEventListener('load', () => {
            let url = reader.result;
            if (index == 0) {
                that.setState({ image1: url })
                console.log('Images1', url)
            }
            else if (index == 1) {
                that.setState({ image2: url })
                console.log('Images2', url)
            }
            else if (index == 2) {
                that.setState({ image3: url })
                console.log('Images3', url)
            }
        })

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        }
    }


    submit() {
        const { image1, image2, image3 } = this.state;
        console.log(image1, 'Image1***')
        if (image1 && image2 && image3) {
            let currentUserObj = { image1, image2, image3, ...this.props.currentUserObj }
            this.props.currentUserData(currentUserObj)
            History.push('/profile');
        }
        else {
            swal({
                title: 'error',
                text: 'Requirement Not Fullfill'
            })
        }

    }

    render() {
        const { image1, image2, image3 } = this.state;
        console.log('Images****', image1)
        return (
            <div>
                <AppBar position="static" color="primary" style={{ height: '80px', textAlign: 'center' }}>
                    <h1>Profile Picture</h1>
                </AppBar>
                <br />
                <br />
                <Input
                    type='file'
                    name="file"
                    placeholder="Placeholder"
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={() => this.uploadimage(0)}
                />
                <br />
                <br />
                <Input
                    type='file'
                    name="file"
                    placeholder="Placeholder"
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={() => this.uploadimage(1)}

                />
                <br />
                <br />
                <Input
                    type='file'
                    name="file"
                    placeholder="Placeholder"
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={() => this.uploadimage(2)}

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
        currentUserData: (photoArray) => {
            dispatch(datastoredAction(photoArray));
        },
        checkuser: (userUID, usersUIDArray, currentUserObj) => {
            dispatch(checkuserAction(userUID, usersUIDArray, currentUserObj));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(UploadPictures);