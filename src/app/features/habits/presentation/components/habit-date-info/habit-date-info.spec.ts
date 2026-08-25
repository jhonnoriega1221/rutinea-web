import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitDateInfo } from "./habit-date-info";

describe("HabitDateInfo", () => {
  let component: HabitDateInfo;
  let fixture: ComponentFixture<HabitDateInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitDateInfo]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitDateInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
