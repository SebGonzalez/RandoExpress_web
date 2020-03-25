import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRandoComponent } from './new-rando.component';

describe('NewRandoComponent', () => {
  let component: NewRandoComponent;
  let fixture: ComponentFixture<NewRandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
