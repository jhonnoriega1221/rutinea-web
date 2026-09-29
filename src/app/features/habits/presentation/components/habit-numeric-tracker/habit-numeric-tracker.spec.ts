import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitNumericTracker } from "./habit-numeric-tracker";

describe("HabitNumericTracker", () => {
  let component: HabitNumericTracker;
  let fixture: ComponentFixture<HabitNumericTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitNumericTracker]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitNumericTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
