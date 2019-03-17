import React, { Component } from 'react';
import AddToCalendar from 'react-add-to-calendar';
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faCalendarCheck)

class Example extends Component {
    // static displayName = 'Example';
    constructor(props) {
        super(props);
        this.state = {
            event: {
                title: 'Sample Event',
                description: 'This is the sample event provided as an example only',
                location: 'Portland, OR',
                startTime: '2016-09-16T20:15:00-04:00',
                endTime: '2016-09-16T21:45:00-04:00'
            },
            istItems: [
                { apple: "Apple Calendar" },
                { google: "Google" },
                // { outlook: "Outlook" },
                // { outlookcom: "Outlook.com" },
                // { yahoo: "Yahoo" }
            ],
        }
    }
    // state = {
    //     event: {
    //         title: 'Sample Event',
    //         description: 'This is the sample event provided as an example only',
    //         location: 'Portland, OR',
    //         startTime: '2016-09-16T20:15:00-04:00',
    //         endTime: '2016-09-16T21:45:00-04:00'
    //     }
    // };
    componentWillMount() {
        const { item } = this.props;
        console.log('Item***********', item)
    }

    render() {
        const { event, istItems } = this.state;
        return (
            <div>
                <Button size={"small"} variant={"outlined"} color={"primary"}>
                    <FontAwesomeIcon
                        size='1x'
                        icon={"calendar-check"}
                        style={{ marginRight: '5px' }}
                    />
                    <AddToCalendar event={event} istItems={istItems} />;
                </Button>
            </div>
        )
    };
}

export default Example