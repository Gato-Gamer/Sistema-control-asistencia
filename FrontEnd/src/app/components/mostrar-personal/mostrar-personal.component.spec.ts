import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPersonalComponent } from './mostrar-personal.component';

describe('MostrarPersonalComponent', () => {
  let component: MostrarPersonalComponent;
  let fixture: ComponentFixture<MostrarPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
