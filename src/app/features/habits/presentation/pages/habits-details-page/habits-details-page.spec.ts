import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitsDetailsPage } from "./habits-details-page";

describe("HabitsDetailsPage", () => {
  let component: HabitsDetailsPage;
  let fixture: ComponentFixture<HabitsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsDetailsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
