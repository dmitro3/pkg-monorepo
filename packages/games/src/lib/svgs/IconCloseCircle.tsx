import * as React from "react";
import { SVGProps } from "react";
const IconCloseCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#71717A"
      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0Zm3.09 11.91a.833.833 0 1 1-1.18 1.18L10 11.177 8.09 13.09a.831.831 0 0 1-1.18 0 .832.832 0 0 1 0-1.178L8.823 10 6.91 8.09a.832.832 0 1 1 1.178-1.18L10 8.823l1.91-1.911a.832.832 0 1 1 1.18 1.178L11.177 10l1.911 1.91Z"
    />
  </svg>
);
export default IconCloseCircle;
