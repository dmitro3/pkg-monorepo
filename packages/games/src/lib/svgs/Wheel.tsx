import type { SVGProps } from 'react';
import * as React from 'react';

const SvgWheel = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <g fill="currentColor" clipPath="url(#wheel_svg__a)">
      <path d="M7.12 9.2c.282.117.603.013.82-.204.216-.216.32-.537.203-.82L6.26 3.626c-.184-.444-.707-.644-1.116-.39a9.117 9.117 0 0 0-2.964 2.963c-.253.41-.054.933.39 1.117L7.12 9.2ZM17.631 13.555c.444.184.955-.044 1.066-.511a9.062 9.062 0 0 0 0-4.199c-.111-.467-.622-.695-1.066-.511l-4.55 1.884c-.283.118-.437.42-.437.726 0 .307.154.608.437.726l4.55 1.885ZM11.633 8.176c-.118.283-.013.604.203.82.217.217.538.321.82.204l4.55-1.884c.445-.184.644-.708.391-1.117a9.118 9.118 0 0 0-2.964-2.964c-.409-.253-.932-.053-1.116.391l-1.884 4.55ZM8.143 13.713c.118-.283.013-.604-.203-.82-.217-.217-.538-.321-.82-.204l-4.55 1.884c-.445.184-.644.708-.391 1.117a9.116 9.116 0 0 0 2.964 2.964c.409.253.932.053 1.116-.391l1.884-4.55ZM6.695 11.67c.284-.117.437-.418.437-.725s-.153-.609-.437-.726l-4.55-1.885c-.443-.183-.954.045-1.065.512a9.063 9.063 0 0 0 0 4.199c.111.467.622.695 1.065.511l4.55-1.885ZM12.657 12.69c-.283-.118-.604-.014-.82.203-.217.216-.322.537-.204.82l1.884 4.55c.184.444.707.644 1.116.39a9.117 9.117 0 0 0 2.964-2.963c.253-.41.053-.933-.39-1.117l-4.55-1.884ZM10.614 14.138c-.117-.284-.419-.437-.726-.437s-.608.153-.726.437l-1.884 4.55c-.184.444.044.954.511 1.066a9.062 9.062 0 0 0 4.2 0c.466-.112.694-.622.51-1.066l-1.885-4.55ZM9.888 9.291a1.654 1.654 0 1 0 0 3.308 1.654 1.654 0 0 0 0-3.308Zm0 2.205a.552.552 0 1 1 0-1.103.552.552 0 0 1 0 1.103ZM8.356.763 9.38 3.22a.55.55 0 0 0 1.017 0L11.421.763A.552.552 0 0 0 10.912 0H8.865a.55.55 0 0 0-.509.763Z" />
      <path d="M12.399 2.245a.422.422 0 0 0-.505.247l-.48 1.152a1.654 1.654 0 0 1-3.052 0l-.48-1.152a.422.422 0 0 0-.505-.247.418.418 0 0 0-.262.566L9.16 7.752c.118.284.42.437.726.437.307 0 .609-.153.726-.437L12.66 2.81a.417.417 0 0 0-.261-.565Z" />
    </g>
    <defs>
      <clipPath id="wheel_svg__a">
        <path fill="currentColor" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgWheel;
