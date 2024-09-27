import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioNodeComponent } from './envio-node.component';

describe('EnvioNodeComponent', () => {
  let component: EnvioNodeComponent;
  let fixture: ComponentFixture<EnvioNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvioNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
