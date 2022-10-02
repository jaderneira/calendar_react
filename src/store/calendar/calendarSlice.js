
import { createSlice } from '@reduxjs/toolkit';
// import addHours from 'date-fns/addHours';

// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'Birthday',
//     notes: 'Buy cake',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       id: 123,
//       name: 'Luis'
//     }
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        activeEvent: null,
        events: [
            
        ],
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
                if ( event.id === payload.id){
                    return payload;
                }

                return event;
            })
            state.activeEvent = null;
        },
        onDeleteEvent: ( state ) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event._uid !== state.activeEvent._uid );
                state.activeEvent = null;
            }
        },
        onLoadEvents: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            //state.events = payload
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ){
                    state.events.push( event )
                }
            })
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddNewEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onSetActiveEvent, 
    onUpdateEvent, 
} = calendarSlice.actions;