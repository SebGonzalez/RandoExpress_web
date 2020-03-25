import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRandoComponent } from './list-rando.component';

describe('ListRandoComponent', () => {
  let component: ListRandoComponent;
  let fixture: ComponentFixture<ListRandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
