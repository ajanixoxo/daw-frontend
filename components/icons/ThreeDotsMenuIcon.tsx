import * as React from "react";
import type { SVGProps } from "react";

interface ThreeDotsMenuIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const ThreeDotsMenuIcon = ({ color = "#344054", ...props }: ThreeDotsMenuIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill={color}
    {...props}
  >
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
  </svg>
);

export default ThreeDotsMenuIcon;
