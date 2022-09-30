
import { createSlice } from '@reduxjs/toolkit';
import addHours from 'date-fns/addHours'

const tempEvent = {
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
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;