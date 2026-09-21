import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoryFilterPicker } from "./category-filter-picker";

describe("CategoryFilterPicker", () => {
  let component: CategoryFilterPicker;
  let fixture: ComponentFixture<CategoryFilterPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterPicker]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
