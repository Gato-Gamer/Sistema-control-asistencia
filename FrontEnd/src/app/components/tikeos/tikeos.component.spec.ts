import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikeosComponent } from './tikeos.component';

describe('TikeosComponent', () => {
  let component: TikeosComponent;
  let fixture: ComponentFixture<TikeosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TikeosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TikeosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
