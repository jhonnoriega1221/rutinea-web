import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResponsiveDialogSheet } from "./responsive-dialog-sheet";

describe("ResponsiveDialogSheet", () => {
  let component: ResponsiveDialogSheet;
  let fixture: ComponentFixture<ResponsiveDialogSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveDialogSheet]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveDialogSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
