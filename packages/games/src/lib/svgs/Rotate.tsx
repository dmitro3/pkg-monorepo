import type { SVGProps } from 'react';
import * as React from 'react';

const SvgRotate = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} fill="none" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.863 14.875c-3.529 3.529-3.529 9.208-3.529 20.566v32.125c0 11.363 0 17.042 3.53 20.571 3.528 3.53 9.207 3.53 20.566 3.53h4.017c11.358 0 17.041 0 20.566-3.53 3.53-3.529 3.53-9.208 3.53-20.567V35.446c0-11.363 0-17.042-3.53-20.571-3.529-3.53-9.208-3.53-20.566-3.53H32.43c-11.358 0-17.042 0-20.567 3.53Zm12.534 5.508a3.012 3.012 0 1 0 0 6.02H44.48a3.012 3.012 0 0 0 0-6.02H24.397Zm10.041 59.233a6.025 6.025 0 1 0 .317-12.046 6.025 6.025 0 0 0-.317 12.046ZM88.655 67.57c0 11.359 0 17.038-3.53 20.567-1.879 1.875-7.008 2.767-12.424 3.188-3.709.287-5.567.429-6.854-.763-1.288-1.191-1.288-3.146-1.288-7.046V51.675c0-3.904 0-5.854 1.283-7.046 1.284-1.192 3.142-1.054 6.859-.78 5.416.405 10.546 1.272 12.425 3.15 3.529 3.53 3.529 9.209 3.529 20.571Zm-9.038-8.033a3.011 3.011 0 1 0-6.02 0v16.067a3.01 3.01 0 0 0 3.01 3.124 3.014 3.014 0 0 0 3.01-3.124V59.537ZM65.605 10.841a3.013 3.013 0 0 1 3.475-2.466c12.85 2.187 22.587 13.5 22.587 27.066a3.012 3.012 0 0 1-4.7 2.496l-6.02-4.07a3.013 3.013 0 0 1 3.374-4.992l.396.27c-2.316-7.666-8.75-13.487-16.645-14.833a3.012 3.012 0 0 1-2.467-3.47Z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgRotate;
