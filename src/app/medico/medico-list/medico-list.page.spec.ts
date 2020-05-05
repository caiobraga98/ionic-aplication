import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoListPage } from './medico-list.page';

describe('MedicoListPage', () => {
  let component: MedicoListPage;
  let fixture: ComponentFixture<MedicoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
