export type MainNavigationItem = {
  icon: string;
  title: string;
  url: string;
};

export const mainNavigationItemsData: MainNavigationItem[] = [
  { icon: "lucideLayoutDashboard", title: "Dashboard", url: "/" },
  { icon: "lucideCalendarFold", title: "Agenda", url: "/agenda" },
  { icon: "lucideSettings", title: "Settings", url: "/settings" }
];
