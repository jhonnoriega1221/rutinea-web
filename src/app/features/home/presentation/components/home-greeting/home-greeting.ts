import { Component, computed, inject, input, signal } from "@angular/core";
import { AppInfoService } from "../../../../../core/app-info/app-info.service";

@Component({
  selector: "app-home-greeting",
  imports: [],
  templateUrl: "./home-greeting.html",
  styleUrl: "./home-greeting.css"
})
export class HomeGreeting {
  private readonly _appInfo = inject(AppInfoService);

  selectedDate = input<Date>(new Date());

  showGreeting = signal<boolean>(false);
  animateDate = signal<boolean>(false);

  protected readonly greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 19) return "Good afternoon";
    return "Good evening";
  });

  protected readonly formattedDate = computed(() => {
    return new Intl.DateTimeFormat("us-EN", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(new Date());
  });

  ngOnInit() {
    if (!this._appInfo.hasSeenDashboardGreeting) {
      this.showGreeting.set(true);
      this.animateDate.set(true);
      this._appInfo.hasSeenDashboardGreeting = true;

      setTimeout(() => {
        this.showGreeting.set(false);
      }, 1800);
    }
  }
}
