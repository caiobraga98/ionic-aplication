import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoFormPage } from './medico-form.page';

describe('MedicoFormPage', () => {
  let component: MedicoFormPage;
  let fixture: ComponentFixture<MedicoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
