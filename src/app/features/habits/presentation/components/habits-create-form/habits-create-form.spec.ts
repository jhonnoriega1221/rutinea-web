import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HabitsCreateForm } from "./habits-create-form";

describe("HabitsCreateForm", () => {
  let component: HabitsCreateForm;
  let fixture: ComponentFixture<HabitsCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsCreateForm]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
