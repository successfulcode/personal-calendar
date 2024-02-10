import { EventTypes } from '../enums/event-types.enum';

export interface IEvent {
  id: string;
  title: string;
  date: string;
  start: Date;
  end: Date;
  type: EventTypes;
  description: string;
}