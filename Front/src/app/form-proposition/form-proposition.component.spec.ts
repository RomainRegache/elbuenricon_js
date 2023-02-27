import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPropositionComponent } from './form-proposition.component';

describe('FormPropositionComponent', () => {
  let component: FormPropositionComponent;
  let fixture: ComponentFixture<FormPropositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPropositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
