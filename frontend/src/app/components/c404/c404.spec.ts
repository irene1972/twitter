import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C404 } from './c404';

describe('C404', () => {
  let component: C404;
  let fixture: ComponentFixture<C404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [C404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
