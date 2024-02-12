import { createReducer, on } from '@ngrx/store';
import { IEvent } from 'app/types/interfaces/ievent.model';
import { createEvent, deleteEvent } from './calendar-events.actions';

import { INITIAL_EVENTS } from 'app/utils/initial-events';

export interface IState {
  events: IEvent[]
};

export const initialState: IState = {
  events: INITIAL_EVENTS as IEvent[]
};

export const EventsReducer = createReducer(
  initialState,
  on(createEvent, (state, { newEvent }) => ({ ...state, events: [...state.events, newEvent] })),
  on(deleteEvent, (state, { id }) => ({ ...state, events: state.events.filter(event => event.id !== id) }))
);