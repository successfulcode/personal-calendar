import { EventTypes } from '../enums/event-types.enum';

export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: EventTypes;
  description: string;
}