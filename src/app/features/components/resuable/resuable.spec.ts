import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resuable } from './resuable';

describe('Resuable', () => {
  let component: Resuable;
  let fixture: ComponentFixture<Resuable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resuable],
    }).compileComponents();

    fixture = TestBed.createComponent(Resuable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
