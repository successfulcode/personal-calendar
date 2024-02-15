import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { EventTypes } from 'app/types/enums/event-types.enum';
import { IEvent } from 'app/types/interfaces/ievent.model';

export const INITIAL_EVENTS: IEvent[] = [];

const eventTypes = Object.values(EventTypes),
  eventTitles = [
    'Meeting with team',
    'Call with client',
    'Out of office for vacation',
    'Project planning',
    'Code review',
    'Idea brainstorming',
    'Client feedback session',
    'Backlog grooming',
    'Release planning',
    'Roadmap discussion',
    'Architecture review',
    'Design discussion',
    'Documentation review',
    'Milestone planning',
    'Risk assessment',
  ],
  eventDescriptions = [
    'Discussing the project progress',
    'Discussing the project requirements',
    'I will be out of office',
    'Planning the next sprint',
    'Reviewing the code',
    'Brainstorming for new ideas',
    'Discussing feedback from the client',
    'Going through the project backlog',
    'Planning for the upcoming release',
    'Discussing the project roadmap',
    'Reviewing the project architecture',
    'Discussing the project design',
    'Going through the project documentation',
    'Discussing the project milestones',
    'Reviewing the project risks',
  ];

for (let month = 6; month >= 0; month--) {
  for (let day = 1; day <= 29; day += 3) {
    const date = moment().subtract(month, 'months').date(day),
    event = {
      id: uuidv4(),
      title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
      start: moment(date).toISOString(),
      end: date.add(1, 'hours').toISOString(),
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      description: eventDescriptions[Math.floor(Math.random() * eventDescriptions.length)],
    };
    INITIAL_EVENTS.push(event);
  }
}