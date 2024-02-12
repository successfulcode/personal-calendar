import { createAction, props } from '@ngrx/store';
import { EventActions } from 'app/types/enums/event-actions.enum';
import { IEvent } from 'app/types/interfaces/ievent.model';

export const createEvent = createAction(EventActions.CREATE_EVENT, props<{ newEvent: IEvent }>());

export const deleteEvent = createAction(EventActions.DELETE_EVENT, props<{ id: string }>());