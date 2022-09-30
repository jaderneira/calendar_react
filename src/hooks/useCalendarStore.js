import { useSelector, useDispatch } from 'react-redux';
import { calendarApi } from '../api';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store';

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

        if( calendarEvent._id ){
            dispatch( onUpdateEvent({...calendarEvent}) );
        } else {
            const { data } = await calendarApi.post('/events', calendarEvent)

           dispatch( onAddNewEvent({
                ...calendarEvent,
                id: data.evento.id,
                user
            }) );
        }
    }

    const startDeletingEvent = async() => {
        dispatch( onDeleteEvent() );
    }


    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        
        //* Methods
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,        
    }
}