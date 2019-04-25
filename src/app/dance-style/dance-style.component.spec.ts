import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceStyleComponent } from './dance-style.component';

describe('DanceStyleComponent', () => {
  let component: DanceStyleComponent;
  let fixture: ComponentFixture<DanceStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanceStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
