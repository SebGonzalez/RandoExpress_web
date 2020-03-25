import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRandoComponent } from './single-rando.component';

describe('SingleRandoComponent', () => {
  let component: SingleRandoComponent;
  let fixture: ComponentFixture<SingleRandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleRandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
