import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContainer } from './client.container';

describe('ClientComponent', () => {
  let component: ClientContainer;
  let fixture: ComponentFixture<ClientContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
