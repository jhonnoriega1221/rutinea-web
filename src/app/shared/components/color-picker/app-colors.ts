export interface ColorOption {
  key: string;
  label: string;
  cssVar: string;
}

export const CATEGORY_COLORS: ColorOption[] = [
  { key: "red", label: "Red", cssVar: "--cat-red" },
  { key: "orange", label: "Orange", cssVar: "--cat-orange" },
  { key: "amber", label: "Amber", cssVar: "--cat-amber" },
  { key: "yellow", label: "Yellow", cssVar: "--cat-yellow" },
  { key: "lime", label: "Lime", cssVar: "--cat-lime" },
  { key: "green", label: "Green", cssVar: "--cat-green" },
  { key: "emerald", label: "Emerald", cssVar: "--cat-emerald" },
  { key: "teal", label: "Teal", cssVar: "--cat-teal" },
  { key: "cyan", label: "Cyan", cssVar: "--cat-cyan" },
  { key: "blue", label: "Blue", cssVar: "--cat-blue" },
  { key: "indigo", label: "Indigo", cssVar: "--cat-indigo" },
  { key: "violet", label: "Violet", cssVar: "--cat-violet" },
  { key: "purple", label: "Purple", cssVar: "--cat-purple" },
  { key: "fuchsia", label: "Fuchsia", cssVar: "--cat-fuchsia" },
  { key: "pink", label: "Pink", cssVar: "--cat-pink" },
  { key: "slate", label: "Slate", cssVar: "--cat-slate" }
];

export function getColorByKey(colorKey: string): ColorOption | undefined {
  return CATEGORY_COLORS.find((color) => color.key === colorKey);
}
