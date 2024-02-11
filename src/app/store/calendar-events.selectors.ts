import { createSelector, createFeatureSelector } from '@ngrx/store';

import { EventInput } from '@fullcalendar/core';
import { IState } from './calendar-events.reducer';
import { IEvent } from 'app/types/interfaces/ievent.model';

export const selectState = createFeatureSelector<IState>('events');

export const selectFullCalendarEvents = createSelector(
  selectState,
  (state: IState): EventInput[] => state.events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end
  }))
);

export const selectEventById = (id: string | null) => {
  if (id === null) {
    return createSelector(selectState, () => undefined);
  }

  return createSelector(
    selectState,
    (state: IState): IEvent | undefined => state.events.find(event => event.id === id)
  );
};