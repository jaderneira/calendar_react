import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {
        activeEvent,
        events,
    } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        if( calendarEvent._id ){
            dispatch( onUpdateEvent({...calendarEvent}) );
        } else {
            dispatch( onAddNewEvent({
                ...calendarEvent,
                _id: new Date().getTime()
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