import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoriesListItem } from "./categories-list-item";

describe("CategoriesListItem", () => {
  let component: CategoriesListItem;
  let fixture: ComponentFixture<CategoriesListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListItem]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
