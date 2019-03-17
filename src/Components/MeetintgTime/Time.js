// import React, { Component } from 'react';
// import { connect } from 'react-redux';



// class Time extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false
//         }
//     }

//     render() {
//         return (
//             <Dialog
//                 open={this.state.open}
//                 onClose={this.handleClose}
//                 aria-labelledby="form-dialog-title"
//             >
//                 <DialogTitle id="form-dialog-title">Set a meeting time</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         id="datetime-local"
//                         label="Next appointment"
//                         type="datetime-local"
//                         // defaultValue="2017-05-24T10:30"
//                         // defaultValue={new Date().toString()}
//                         onChange={this.pickTime}
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={this.handleClose} color="primary">
//                         Cancel
//                             </Button>
//                     <Button onClick={this.sendRequest} color="primary">
//                         Send Request
//                             </Button>
//                 </DialogActions>
//             </Dialog>
//         )
//     }
// }


// function mapStateToProp(state) {
//     return ({
//         currentUser: state.root.currentUser,
//         currentUserUID: state.root.currentUserUID,
//     })
// }
// function mapDispatchToProp(dispatch) {
//     return ({
//         // usersUID: () => {
//         //     dispatch(usersUIDArray())
//         // }
//     })
// }

// export default connect(mapStateToProp, mapDispatchToProp)(Time);
