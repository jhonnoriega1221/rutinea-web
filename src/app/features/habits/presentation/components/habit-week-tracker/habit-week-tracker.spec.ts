import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitWeekTracker } from "./habit-week-tracker";

describe("HabitWeekTracker", () => {
  let component: HabitWeekTracker;
  let fixture: ComponentFixture<HabitWeekTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitWeekTracker]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitWeekTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
