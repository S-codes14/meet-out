import React, {useState} from 'react'
import {
    Calendar,
    momentLocalizer,
    // move,
    // Views,
    // Navigate,
    // components,
  } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MeetForCalendar} from './Content'
import { Container } from 'reactstrap';
import { Decoded } from '../App';
import MeetModal from './MeetModal'


interface CalendarProps {
    user: Decoded | null,
    myPrivateMeets: MeetForCalendar[];
    myPublicMeets: MeetForCalendar[];
    attendingPublicMeets: MeetForCalendar[];
    notAttendingPublicMeets: MeetForCalendar[];
    currentMeet: MeetForCalendar | null;
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const MyCalendar: React.FC<CalendarProps> = (props) => {
    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment);

    //modal for showing more details
    const [modal, setModal] = useState(false);
    
    let displayMeets = [...props.myPrivateMeets, ...props.myPublicMeets, ...props.attendingPublicMeets, ...props.notAttendingPublicMeets].map(meet => {
        return meet
    })
    
    //toggle function for modal
    const toggle = () => setModal(!modal);

    const showDetails = (meet: MeetForCalendar) => {
        props.updateMeet(meet)
        toggle()
    }

    // // //function to go to add event form
    //     // const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => {
    //     const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => { 
    //         //link to add form, pass start and end    

    // }

    return (
        <Container>
        <h2>Calendar:</h2>
        <Container className="calendar">
            <Calendar
                selectable
                localizer={localizer}
                events={displayMeets}
                views={['month', 'week', 'day', 'agenda']}
                onSelectEvent={meet => showDetails(meet)} //show more details - function to be created
                onSelectSlot={({start, end }) => console.log(start, end)} //add event when selecting a certain day/time - function to be created
                // onSelectSlot={({ start, end }) => window.prompt('New Event Name')} //add event when selecting a certain day/time - function to be created
                // drilldownView="agenda"
                // components={components} -can create custom components to replace existing components
            />
            
            <MeetModal 
                user={props.user} 
                currentMeet={props.currentMeet} 
                modal={modal} 
                updateMeet={props.updateMeet} 
                toggle={toggle} 
            />
            
        </Container>
        </Container>
    )
}

export default MyCalendar