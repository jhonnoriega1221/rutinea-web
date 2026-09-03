import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResponsiveDialog } from "./responsive-dialog";

describe("ResponsiveDialog", () => {
  let component: ResponsiveDialog;
  let fixture: ComponentFixture<ResponsiveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveDialog]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
