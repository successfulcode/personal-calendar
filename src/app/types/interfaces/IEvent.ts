import { EventTypes } from '../enums/EventTypes';

export interface IEvent {
  id: string;
  title: string;
  date: string;
  start: Date;
  end: Date;
  type: EventTypes;
  description: string;
}