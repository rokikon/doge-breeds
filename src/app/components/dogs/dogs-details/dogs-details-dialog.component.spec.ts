import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsDetailsDialog } from './dogs-details-dialog.component';

describe('DogsDetailsComponent', () => {
  let component: DogsDetailsDialog;
  let fixture: ComponentFixture<DogsDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogsDetailsDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogsDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
