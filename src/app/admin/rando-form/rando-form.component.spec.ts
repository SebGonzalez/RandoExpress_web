import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandoFormComponent } from './rando-form.component';

describe('RandoFormComponent', () => {
  let component: RandoFormComponent;
  let fixture: ComponentFixture<RandoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
