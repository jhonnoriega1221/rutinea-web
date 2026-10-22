import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  output,
  signal,
  viewChild
} from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import { DataState } from "../../../../../shared/components/data-state/data-state";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AgendaList } from "../../components/agenda-list/agenda-list";
import { HorizontalDatePicker } from "../../components/horizontal-date-picker/horizontal-date-picker";
import { HlmDropdownMenuImports } from "@spartan-ng/helm/dropdown-menu";
import { ResponsivePopup } from "../../../../../shared/components/responsive-popup/responsive-popup";
import { HabitsCreateForm } from "../../../../habits/presentation/components/habits-create-form/habits-create-form";
import { CategoryUpsertForm } from "../../../../categories/presentation/components/category-upsert-form/category-upsert-form";
import { HabitsFacade } from "../../../../habits/presentation/facade/habits.facade";
import { HabitLogsFacade } from "../../../../habits/presentation/facade/habit-logs.facade";
import { CategoriesFacade } from "../../../../categories/presentation/facade/categories.facade";
import { HabitAgendaListViewModel } from "../../../../home/presentation/models/habit-agenda-list.view-model";
import {
  getWeekDates,
  resolveDayState,
  toDate,
  toDateKey
} from "../../../../habits/domain/utils/day-state.util";
import {
  CreateHabitFormModel,
  Weekday,
  WEEKDAYS
} from "../../../../habits/domain/models/habit.model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { getColorByKey } from "../../../../../shared/components/color-picker/app-colors";
import { ToggleValue } from "@spartan-ng/brain/toggle-group";
import { toast } from "@spartan-ng/brain/sonner";
import { UpsertCategoryFormModel } from "../../../../categories/domain/models/category.model";
import { HabitListFilters } from "../../../../habits/presentation/models/habit-list.view-model";
import { CalendarDatePicker } from "../../components/calendar-date-picker/calendar-date-picker";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  imports: [
    AgendaList,
    HorizontalDatePicker,
    HlmButtonImports,
    HlmToggleGroupImports,
    NgIcon,
    DataState,
    RouterLink,
    HlmDropdownMenuImports,
    ResponsivePopup,
    HabitsCreateForm,
    CategoryUpsertForm,
    RouterLink,
    DataState,
    CalendarDatePicker
  ],
  selector: "app-agenda-page",
  styleUrl: "./agenda-page.css",
  templateUrl: "./agenda-page.html"
})
export class AgendaPage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _queryParamMap = toSignal(this._route.queryParamMap);
  private readonly _habitsFacade = inject(HabitsFacade);
  private readonly _habitLogsFacade = inject(HabitLogsFacade);
  private readonly _categoriesFacade = inject(CategoriesFacade);
  protected readonly today = new Date();
  protected readonly todayKey = toDateKey(new Date());

  readonly habits = this._habitsFacade.habits;
  readonly habitLogs = this._habitLogsFacade.listLogsMap;
  readonly categories = this._categoriesFacade.categories;

  protected readonly selectedTab = signal<"due" | "completed">("due");
  protected readonly selectedDate = signal<string>(this.todayKey);
  protected readonly calendarFocusMonthYear = signal<Date>(new Date());

  constructor() {
    effect(() => {
      const dayParam = this._queryParamMap()?.get("day");
      const targetDate = dayParam || this.todayKey;

      if (this.selectedDate() !== targetDate) {
        this.calendarFocusMonthYear.set(toDate(targetDate));
        this.selectedDate.set(targetDate);
      }
    });
  }

  protected readonly calendarProgressMap = computed<Map<string, number>>(() => {
    const allHabits = this.habits();
    const logsMap = this.habitLogs();
    const progressMap = new Map<string, number>();

    const focus = this.calendarFocusMonthYear();
    const year = focus.getFullYear();
    const month = focus.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dateKey = toDateKey(d);
      const currentWeekDays = getWeekDates(d);
      const currentWeekDaysKeys = currentWeekDays.map((day) => toDateKey(day));

      let scheduledCount = 0;
      let completedCount = 0;

      allHabits.forEach((habit) => {
        const habitLogs = logsMap.get(habit.id) ?? new Set<string>();
        const isCompleted = habitLogs.has(dateKey);

        let scheduleDays = new Set<Weekday>();

        if (habit.frequencyData.type === "everyday") {
          scheduleDays = new Set(WEEKDAYS);
        } else if (habit.frequencyData.type === "specific_days") {
          scheduleDays = new Set(habit.frequencyData.days);
        } else if (habit.frequencyData.type === "days_per_week") {
          const completionsThisWeek = currentWeekDaysKeys.filter((key) =>
            habitLogs.has(key)
          ).length;
          const quota = habit.frequencyData.count;

          if (completionsThisWeek >= quota) {
            scheduleDays = new Set<Weekday>();
          } else {
            scheduleDays = new Set(WEEKDAYS);
          }
        }

        const dayState = resolveDayState({
          date: d,
          scheduled: scheduleDays,
          completed: isCompleted,
          createdAt: habit.createdAt
        });

        if (dayState !== "not-scheduled" && dayState !== "future-date") {
          scheduledCount++;
          if (dayState === "completed") {
            completedCount++;
          }
        }
      });

      const percentage =
        scheduledCount > 0 ? Math.round((completedCount / scheduledCount) * 100) : 0;
      progressMap.set(dateKey, percentage);
    }

    return progressMap;
  });
  protected readonly createHabitDialog = viewChild.required<ResponsivePopup>("createHabitDialog");
  protected readonly calendarDialog = viewChild.required<ResponsivePopup>("calendarDialog");
  protected readonly createCategoryDialog =
    viewChild.required<ResponsivePopup>("createCategoryDialog");
  protected readonly createHabitForm = viewChild<HabitsCreateForm>("createHabitForm");

  protected readonly filters = signal<HabitListFilters>({
    categoryId: null
  });

  async ngOnInit() {
    await this._habitsFacade.loadAll();
    await this._categoriesFacade.loadAll();

    const habitIds = this._habitsFacade.habits().map((h) => h.id);
    if (habitIds.length === 0) return;

    const dayParam = this._queryParamMap()?.get("day");
    const targetDateKey = dayParam || this.todayKey;
    const targetDate = toDate(targetDateKey);

    const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

    const thirtyDaysAgo = new Date(this.today);
    thirtyDaysAgo.setDate(this.today.getDate() - 29);

    await this._habitLogsFacade.loadLogsForHabitsList(habitIds, thirtyDaysAgo, this.today);
    await this._habitLogsFacade.loadLogsForHabitsList(habitIds, startOfMonth, endOfMonth);
  }

  readonly habitsForSelectedDate = computed<HabitAgendaListViewModel[]>(() => {
    const allHabits = this.habits();
    const dateKey = this.selectedDate();
    const selectedDate = toDate(dateKey);
    const logsMap = this.habitLogs();

    const currentWeekDays = getWeekDates(selectedDate);
    const currentWeekDaysKeys = currentWeekDays.map((day) => toDateKey(day));

    return allHabits.map((habit) => {
      const habitLogs = logsMap.get(habit.id) ?? new Set<string>();
      const category = this.categories().find((c) => c.id === habit.categoryId);

      const isCompleted = habitLogs.has(dateKey);

      let scheduleDays = new Set<Weekday>();

      if (habit.frequencyData.type === "everyday") {
        scheduleDays = new Set(WEEKDAYS);
      } else if (habit.frequencyData.type === "specific_days") {
        scheduleDays = new Set(habit.frequencyData.days);
      } else if (habit.frequencyData.type === "days_per_week") {
        const completionsThisWeek = currentWeekDaysKeys.filter((key) => habitLogs.has(key)).length;
        const quota = habit.frequencyData.count;

        if (completionsThisWeek >= quota) {
          scheduleDays = new Set<Weekday>();
        } else {
          scheduleDays = new Set(WEEKDAYS);
        }
      }

      const dayState = resolveDayState({
        date: selectedDate,
        scheduled: scheduleDays,
        completed: isCompleted,
        createdAt: habit.createdAt
      });
      return {
        ...habit,
        icon: getIconByKey(habit.icon)!.icon,
        dayState,
        categoryInfo: category
          ? {
              id: habit.categoryId,
              name: category.name,
              color: category.color,
              cssVar: getColorByKey(category.color)?.cssVar!
            }
          : null
      };
    });
  });

  readonly scheduleTitle = computed(() => {
    const selectedKey = this.selectedDate();

    if (selectedKey === this.todayKey) {
      return "Today's Schedule";
    }

    const date = toDate(selectedKey);
    const formatter = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });

    return `${formatter.format(date)} Schedule`;
  });

  readonly dailyProgressMap = computed<Map<string, number>>(() => {
    const allHabits = this.habits();
    const logsMap = this.habitLogs();
    const progressMap = new Map<string, number>();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(this.today);
      d.setDate(this.today.getDate() - i);

      const dateKey = toDateKey(d);
      const currentWeekDays = getWeekDates(d);
      const currentWeekDaysKeys = currentWeekDays.map((day) => toDateKey(day));

      let scheduledCount = 0;
      let completedCount = 0;

      allHabits.forEach((habit) => {
        const habitLogs = logsMap.get(habit.id) ?? new Set<string>();
        const isCompleted = habitLogs.has(dateKey);

        let scheduleDays = new Set<Weekday>();

        if (habit.frequencyData.type === "everyday") {
          scheduleDays = new Set(WEEKDAYS);
        } else if (habit.frequencyData.type === "specific_days") {
          scheduleDays = new Set(habit.frequencyData.days);
        } else if (habit.frequencyData.type === "days_per_week") {
          const completionsThisWeek = currentWeekDaysKeys.filter((key) =>
            habitLogs.has(key)
          ).length;
          const quota = habit.frequencyData.count;

          if (completionsThisWeek >= quota) {
            scheduleDays = new Set<Weekday>();
          } else {
            scheduleDays = new Set(WEEKDAYS);
          }
        }

        const dayState = resolveDayState({
          date: d,
          scheduled: scheduleDays,
          completed: isCompleted,
          createdAt: habit.createdAt
        });

        if (dayState !== "not-scheduled" && dayState !== "future-date") {
          scheduledCount++;
          if (dayState === "completed") {
            completedCount++;
          }
        }
      });

      const percentage =
        scheduledCount > 0 ? Math.round((completedCount / scheduledCount) * 100) : 0;
      progressMap.set(dateKey, percentage);
    }

    return progressMap;
  });

  readonly dueCount = computed(
    () =>
      this.habitsForSelectedDate().filter(
        (h) => h.dayState === "pending" || h.dayState === "urgent" || h.dayState === "missed"
      ).length
  );
  readonly completedCount = computed(
    () => this.habitsForSelectedDate().filter((h) => h.dayState === "completed").length
  );

  readonly dueHabits = computed(() => {
    return this.habitsForSelectedDate().filter(
      (h) => h.dayState === "pending" || h.dayState === "urgent" || h.dayState === "missed"
    );
  });

  readonly completedHabits = computed(() => {
    return this.habitsForSelectedDate().filter((h) => h.dayState === "completed");
  });

  readonly summaryHabits = computed(() => {
    const isDueTab = this.selectedTab() === "due";

    return isDueTab ? this.dueHabits() : this.completedHabits();
  });

  readonly calculateDayPercentage = computed(() => {});

  onChangeDate(date: string) {
    this.calendarDialog().close();
    this.selectedDate.set(date);

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { day: date === this.todayKey ? null : date },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }

  async onToggleHabitCompletion(habitId: string) {
    const selectedDate = this.selectedDate();
    const isCompleted = this.selectedTab() === "completed";

    if (!isCompleted) {
      await this._habitLogsFacade.create({ habitId, date: selectedDate });
    } else {
      await this._habitLogsFacade.delete(habitId, selectedDate);
    }
  }

  async onChangeCalendarFocusMonthYear(event: { month: number; year: number }) {
    const newFocus = new Date(event.year, event.month, 1);
    this.calendarFocusMonthYear.set(newFocus);

    const endOfMonth = new Date(event.year, event.month + 1, 0);
    const habitIds = this.habits().map((h) => h.id);

    await this._habitLogsFacade.loadLogsForHabitsList(habitIds, newFocus, endOfMonth);
  }

  onChangeTab(tabOption: ToggleValue<"due" | "completed">) {
    const selectedTab = tabOption!.toString() as "due" | "completed";
    this.selectedTab.set(selectedTab);
  }

  protected async onHabitSubmitted(model: CreateHabitFormModel): Promise<void> {
    await this._habitsFacade.create(model);
    toast.success("Habit has been created");
    this.createHabitDialog().close();
  }

  onPreviousDay() {
    const current = toDate(this.selectedDate());
    current.setDate(current.getDate() - 1);
    this.onChangeDate(toDateKey(current));
    this.onChangeCalendarFocusMonthYear({ month: current.getMonth(), year: current.getFullYear() });
  }

  onNextDay() {
    if (this.todayKey === this.selectedDate()) return;

    const current = toDate(this.selectedDate());
    current.setDate(current.getDate() + 1);
    this.onChangeDate(toDateKey(current));
    this.onChangeCalendarFocusMonthYear({ month: current.getMonth(), year: current.getFullYear() });
  }

  closeCalendarDialog() {
    const current = toDate(this.selectedDate());
    this.onChangeCalendarFocusMonthYear({ month: current.getMonth(), year: current.getFullYear() });
  }

  protected async onCategorySubmitted(model: UpsertCategoryFormModel): Promise<void> {
    const newCategory = await this._categoriesFacade.create(model);
    toast.success("Category has been created");

    this.createCategoryDialog().close();

    if (newCategory && newCategory.id) {
      const formRef = this.createHabitForm();
      if (formRef) {
        formRef.patchCategory(newCategory.id);
      }
    }
  }
}
