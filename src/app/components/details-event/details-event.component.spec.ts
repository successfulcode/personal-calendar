import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEventComponent } from './details-event.component';
import { EventTypes } from 'app/types/enums/event-types.enum';
import { DatePipe } from '@angular/common';

describe('DetailsEventComponent', () => {
  let component: DetailsEventComponent;
  let fixture: ComponentFixture<DetailsEventComponent>;
  let datePipe: DatePipe 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEventComponent],
      providers: [ DatePipe ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEventComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    component.event = {
      id: 'testId',
      title: 'Test Event',
      type: EventTypes.MEETING,
      start: '2024-02-02T10:00:00',
      end: '2024-02-02T12:00:00',
      description: 'Test Description'
    };
  });

  it('should display event properties correctly', async () => {
    const element = fixture.nativeElement;

    fixture.detectChanges();
    await fixture.whenStable();

    const getElement = (id: string): string => element.querySelector(id).textContent
    expect(getElement('#title')).toContain(component?.event?.title ?? '');
    expect(getElement('#date')).toContain(datePipe.transform(component?.event?.start, 'yyyy-mm-dd')!);
    expect(getElement('#start')).toContain(datePipe.transform(component?.event?.start, 'HH:mm')!);
    expect(getElement('#end')).toContain(datePipe.transform(component?.event?.end, 'HH:mm')!);
    expect(getElement('#description')).toContain(component?.event?.description!);
  });
});
