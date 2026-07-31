import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainNavbarMobile } from "./main-navbar-mobile";

describe("MainNavbarMobile", () => {
  let component: MainNavbarMobile;
  let fixture: ComponentFixture<MainNavbarMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavbarMobile]
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavbarMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
