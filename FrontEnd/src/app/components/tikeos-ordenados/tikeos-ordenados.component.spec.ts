import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikeosOrdenadosComponent } from './tikeos-ordenados.component';

describe('TikeosOrdenadosComponent', () => {
  let component: TikeosOrdenadosComponent;
  let fixture: ComponentFixture<TikeosOrdenadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TikeosOrdenadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TikeosOrdenadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
