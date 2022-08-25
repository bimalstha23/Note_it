import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarComp = () => {

    const date = new Date();
    return (
        <div>
            <Calendar
                // onChange={(e) => setDate(e)}
                value={date}
            />
        </div>
    )
}
