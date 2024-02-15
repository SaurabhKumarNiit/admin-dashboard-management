import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOrganizerComponent } from './team-organizer.component';

describe('TeamOrganizerComponent', () => {
  let component: TeamOrganizerComponent;
  let fixture: ComponentFixture<TeamOrganizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamOrganizerComponent]
    });
    fixture = TestBed.createComponent(TeamOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
