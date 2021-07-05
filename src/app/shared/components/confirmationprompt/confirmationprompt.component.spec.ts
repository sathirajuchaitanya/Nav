import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationpromptComponent } from './confirmationprompt.component';

describe('ConfirmationpromptComponent', () => {
  let component: ConfirmationpromptComponent;
  let fixture: ComponentFixture<ConfirmationpromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationpromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationpromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
