import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetterComponent } from './setter.component';

describe('SetterComponent', () => {
  let component: SetterComponent;
  let fixture: ComponentFixture<SetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
