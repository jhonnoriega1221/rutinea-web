import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeGreeting } from "./home-greeting";

describe("HomeGreeting", () => {
  let component: HomeGreeting;
  let fixture: ComponentFixture<HomeGreeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGreeting]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeGreeting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
