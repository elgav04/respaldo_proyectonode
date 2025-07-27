import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasTrabajoEditComponent } from './areas-trabajo-edit.component';

describe('AreasTrabajoEditComponent', () => {
  let component: AreasTrabajoEditComponent;
  let fixture: ComponentFixture<AreasTrabajoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasTrabajoEditComponent]
    });
    fixture = TestBed.createComponent(AreasTrabajoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
