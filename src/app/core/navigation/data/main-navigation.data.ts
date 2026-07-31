export type MainNavigationItem = {
  icon: string;
  title: string;
  url: string;
};

export const mainNavigationItemsData: MainNavigationItem[] = [
  { icon: "lucideLayoutDashboard", title: "Dashboard", url: "/" },
  { icon: "lucideListChecks", title: "Habits", url: "/habits" },
  { icon: "lucideSettings", title: "Settings", url: "/settings" }
];
