export interface IconOption {
  key: string;
  label: string;
  icon: string;
}

export const HABIT_ICON_OPTIONS: IconOption[] = [
  { key: "leaf", label: "Leaf", icon: "lucideLeaf" },
  { key: "excercise", label: "Excercise", icon: "lucideDumbbell" },
  { key: "glass", label: "Glass", icon: "lucideGlassWater" },
  { key: "food", label: "Food", icon: "lucideApple" },
  { key: "flame", label: "Flame", icon: "lucideFlame" }
];

export function getIconByKey(iconKey: string) {
  return HABIT_ICON_OPTIONS.find((icon) => icon.key === iconKey);
}
