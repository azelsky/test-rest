import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterContainer } from './waiter.container';

describe('WaiterComponent', () => {
  let component: WaiterContainer;
  let fixture: ComponentFixture<WaiterContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
