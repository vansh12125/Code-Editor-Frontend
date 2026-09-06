import {
  SiHtml5,
  SiExpress,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";

export const Languages = {
  HTML: "HTML",
  EXPRESS: "EXPRESS",
  REACT: "REACT",
  NEXT: "NEXT"
} as const;

export const LanguageIcons = {
  [Languages.HTML]: SiHtml5,
  [Languages.EXPRESS]: SiExpress,
  [Languages.REACT]: SiReact,
  [Languages.NEXT]: SiNextdotjs,
};

export type Languages = (typeof Languages)[keyof typeof Languages];