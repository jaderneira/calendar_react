import { useSelector, useDispatch } from 'react-redux';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {
        activeEvent,
        events,
    } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        try {
            if( calendarEvent.id ){
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            } 
    
            const { data } = await calendarApi.post('/events', calendarEvent)
    
            dispatch( onAddNewEvent({
                ...calendarEvent,
                id: data.evento.id,
                user
            }) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error saving', error.response.data.msg, 'error');
        }        
    }

    const startDeletingEvent = async() => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );
                        
        } catch (error) {
            console.log('Error loading events');
            console.log(error);
        }
    }


    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        
        //* Methods
        startDeletingEvent,
        startLoadingEvents,
        setActiveEvent,
        startSavingEvent,        
    }
}