import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroMesComponent } from './libro-mes.component';

describe('LibroMesComponent', () => {
  let component: LibroMesComponent;
  let fixture: ComponentFixture<LibroMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
