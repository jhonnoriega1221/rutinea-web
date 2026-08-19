import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitCalendarTracker } from "./habit-calendar-tracker";

describe("HabitCalendarTracker", () => {
  let component: HabitCalendarTracker;
  let fixture: ComponentFixture<HabitCalendarTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCalendarTracker]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitCalendarTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
