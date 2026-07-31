import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainNavbarDesktop } from "./main-navbar-desktop";

describe("MainNavbarDesktop", () => {
  let component: MainNavbarDesktop;
  let fixture: ComponentFixture<MainNavbarDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavbarDesktop]
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavbarDesktop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
