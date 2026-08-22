import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitTodayStatusCard } from "./habit-today-status-card";

describe("HabitTodayStatusCard", () => {
  let component: HabitTodayStatusCard;
  let fixture: ComponentFixture<HabitTodayStatusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitTodayStatusCard]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitTodayStatusCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
