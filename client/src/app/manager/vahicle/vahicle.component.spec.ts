import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VahicleComponent } from './vahicle.component';

describe('VahicleComponent', () => {
  let component: VahicleComponent;
  let fixture: ComponentFixture<VahicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VahicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VahicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
