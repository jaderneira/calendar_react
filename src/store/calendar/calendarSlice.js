
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
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;