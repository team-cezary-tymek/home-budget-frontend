import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesTableComponent } from './incomes-table.component';

describe('IncomesTableComponent', () => {
  let component: IncomesTableComponent;
  let fixture: ComponentFixture<IncomesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
