import type { SVGProps } from 'react';
import * as React from 'react';

const SvgDiscord = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#discord_svg__a)">
      <path
        fill="currentColor"
        d="M16.93 3.463A16.491 16.491 0 0 0 12.86 2.2a.062.062 0 0 0-.066.031c-.175.313-.37.72-.506 1.041a15.226 15.226 0 0 0-4.573 0 10.538 10.538 0 0 0-.515-1.04.064.064 0 0 0-.065-.032 16.447 16.447 0 0 0-4.07 1.263.058.058 0 0 0-.028.023C.444 7.36-.266 11.138.083 14.869a.069.069 0 0 0 .026.047 16.586 16.586 0 0 0 4.994 2.525.064.064 0 0 0 .07-.023c.385-.526.728-1.08 1.022-1.662a.063.063 0 0 0-.035-.088 10.917 10.917 0 0 1-1.56-.744.064.064 0 0 1-.007-.106c.105-.079.21-.16.31-.243a.062.062 0 0 1 .065-.009c3.273 1.495 6.817 1.495 10.051 0a.062.062 0 0 1 .066.008c.1.083.204.165.31.244a.064.064 0 0 1-.005.106c-.499.292-1.017.538-1.561.743a.064.064 0 0 0-.034.089 13.3 13.3 0 0 0 1.02 1.661.063.063 0 0 0 .07.024 16.532 16.532 0 0 0 5.003-2.525.065.065 0 0 0 .026-.046c.417-4.314-.699-8.061-2.957-11.383a.05.05 0 0 0-.026-.024ZM6.684 12.597c-.985 0-1.797-.904-1.797-2.015 0-1.111.796-2.016 1.797-2.016 1.01 0 1.814.912 1.798 2.016 0 1.11-.796 2.015-1.798 2.015Zm6.646 0c-.986 0-1.797-.904-1.797-2.015 0-1.111.796-2.016 1.797-2.016 1.009 0 1.813.912 1.797 2.016 0 1.11-.788 2.015-1.797 2.015Z"
      />
    </g>
    <defs>
      <clipPath id="discord_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgDiscord;
