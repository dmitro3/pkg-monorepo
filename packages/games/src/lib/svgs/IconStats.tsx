import type { SVGProps } from 'react';

const SvgStatsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_11467_34720)">
      <path
        d="M8 16C6.9 16 6 15.1 6 14V2C6 0.9 6.9 0 8 0C9.1 0 10 0.9 10 2V14C10 15.1 9.1 16 8 16ZM14 16C12.9 16 12 15.1 12 14V6C12 4.9 12.9 4 14 4C15.1 4 16 4.9 16 6V14C16 15.1 15.1 16 14 16ZM2 16C0.9 16 0 15.1 0 14V10C0 8.9 0.9 8 2 8C3.1 8 4 8.9 4 10V14C4 15.1 3.1 16 2 16Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_11467_34720">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgStatsIcon;
