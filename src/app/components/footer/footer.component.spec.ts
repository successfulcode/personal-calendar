import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const currentYear = new Date().getFullYear();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current year', () => {
    expect(component.currenYear()).toEqual(currentYear);
  });

  it('should have a footer class', () => {
    const element = fixture.nativeElement;
    const footerElement = element.querySelector('.footer');
    
    expect(footerElement).toBeTruthy();
  });

  it('should render a footer text', () => {
    const element = fixture.nativeElement,
      footerText = `© ${currentYear} [S.M]. All rights reserved1`;

    expect(element.querySelector('footer')?.textContent).toContain(footerText);
  });
});
