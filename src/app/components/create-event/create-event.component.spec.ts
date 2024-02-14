import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEventComponent } from './create-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEventComponent, BrowserAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});