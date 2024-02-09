import { EventTypes } from '../enums/EventTypes';

export interface IEvent {
  id: string;
  title: string;
  date: string;
  startTime: string
  endTime: string
  type: EventTypes;
  description: string;
}