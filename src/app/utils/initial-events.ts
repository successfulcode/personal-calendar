import { EventTypes } from 'app/types/enums/event-types.enum';
import { IEvent } from 'app/types/interfaces/ievent.model';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T00:00:00',
//     end: TODAY_STR + 'T03:00:00'
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00',
//     end: TODAY_STR + 'T15:00:00'
//   }
// ];

export const INITIAL_EVENTS: IEvent[] = [
  {
    id: 'test1',
    title: 'test1 All-day event',
    date: TODAY_STR,
    start: TODAY_STR,
    end: TODAY_STR,
    type: EventTypes.MEETING,
    description: 'description'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    date: TODAY_STR,
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00',
    type: EventTypes.MEETING,
    description: 'description'
  },
  {
    id: createEventId(),
    date: TODAY_STR,
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
    type: EventTypes.MEETING,
    description: 'description'
  }
];

export function createEventId() {
  return String(eventGuid++);
}