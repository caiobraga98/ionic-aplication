import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientePage } from './list-paciente.page';

describe('ListPacientePage', () => {
  let component: ListPacientePage;
  let fixture: ComponentFixture<ListPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
