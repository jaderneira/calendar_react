import parseISO from 'date-fns/parseISO';


export const convertEventsToDateEvents = ( events = [] ) => {

    return events.map( event => {

        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    })
}