import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoryUpsertForm } from "./category-upsert-form";

describe("CategoryUpsertForm", () => {
  let component: CategoryUpsertForm;
  let fixture: ComponentFixture<CategoryUpsertForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryUpsertForm]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryUpsertForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
