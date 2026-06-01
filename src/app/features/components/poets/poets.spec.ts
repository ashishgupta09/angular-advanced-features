import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poets } from './poets';

describe('Poets', () => {
  let component: Poets;
  let fixture: ComponentFixture<Poets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poets],
    }).compileComponents();

    fixture = TestBed.createComponent(Poets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
