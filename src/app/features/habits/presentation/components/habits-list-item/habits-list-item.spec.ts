import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitsListItem } from "./habits-list-item";

describe("HabitsListItem", () => {
  let component: HabitsListItem;
  let fixture: ComponentFixture<HabitsListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsListItem]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
