
import { createSlice } from '@reduxjs/toolkit';
import addHours from 'date-fns/addHours';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Birthday',
    notes: 'Buy cake',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: 123,
      name: 'Luis'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        activeEvent: null,
        events: [tempEvent],
    },
    reducers: {
        onSetActiveEvent: (state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event._id === payload._id){
                    return payload;
                }

                return event;
            })
            state.activeEvent = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;