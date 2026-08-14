import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitsList } from "./habits-list";

describe("HabitsList", () => {
  let component: HabitsList;
  let fixture: ComponentFixture<HabitsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsList]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
