export const Languages = {
  HTML: "HTML",
  EXPRESS: "EXPRESS",
  REACT: "REACT",
  NEXT: "NEXT",
} as const;

export type Languages = (typeof Languages)[keyof typeof Languages];