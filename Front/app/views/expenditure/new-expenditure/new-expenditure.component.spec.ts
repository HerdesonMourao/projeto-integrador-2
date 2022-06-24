import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenditureComponent } from './new-expenditure.component';

describe('NewExpenditureComponent', () => {
  let component: NewExpenditureComponent;
  let fixture: ComponentFixture<NewExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpenditureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
