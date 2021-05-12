import moment from 'moment';

export const prepareEvents = ( events = [] ) => {

    return events.values.map(
        (e) => ({
            ...e,
            createdAt: moment( e.createdAt ).toDate(),
            updatedAt: moment( e.updatedAt ).toDate(),
        })
    );

}