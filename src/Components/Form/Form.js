import React, { Component } from 'react';
import './Form.css';
import TextField from '@material-ui/core/TextField';



class Form extends Component {
    render() {
        return (
            <div className="FormDiv">
                <div className="Headings">
                    <h2>COMPLAINANT DETAILS</h2>
                </div>
                <div className="FormFields">
                    <div className="SingleField">
                        <div>
                            <label>
                                Name *
                            </label>
                        </div>
                        <div>
                            <TextField
                                id="outlined-with-placeholder"
                                placeholder="Placeholder"
                                margin="0"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Father's Name *
                            </label>
                        </div>
                        <div>

                        </div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                CNIC# *
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Land Line# *
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Mobile# *
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Email Address
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Present Address *
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Home District *
                            </label>
                        </div>
                        <div></div>

                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Home Police Station *
                            </label>
                        </div>
                        <div></div>

                    </div>

                </div>
                <div className="Headings">
                    <h2>INFORMATION REPORT</h2>
                </div>
                <div className="FormFields">
                    <div className="SingleField">
                        <div>
                            <label>
                                Date of Incident *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Time of Incident *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Place of Incident *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                District of Incident *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Police Station Jurisdiction *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="TextField1">
                        <div>
                            <label>
                                Details of Incident *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Already Visited Police Station *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="TextField2">
                        <div>
                            <label>
                                Visit Details
                                <br />
                                (Name/Rank of Police Officer Visited)
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Visit Date *
                            </label>
                        </div>
                        <div></div>
                    </div>
                    <div className="SingleField">
                        <div>
                            <label>
                                Visit Time *
                            </label>
                        </div>
                        <div></div>
                    </div>
                </div>

            </div>

        )
    }
}

export default Form;