import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#71717A"
      fillRule="evenodd"
      d="M9 .667a8.333 8.333 0 1 0 0 16.666A8.333 8.333 0 0 0 9 .667Zm3.506 4.827a.833.833 0 0 1 0 1.178l-5.834 5.834a.833.833 0 0 1-1.178-1.179l5.833-5.833a.833.833 0 0 1 1.179 0ZM7.54 6.5a1.042 1.042 0 1 1-2.083 0 1.042 1.042 0 0 1 2.083 0Zm5 5a1.042 1.042 0 1 1-2.083 0 1.042 1.042 0 0 1 2.083 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
