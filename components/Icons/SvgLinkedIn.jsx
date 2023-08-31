import * as React from 'react';

const SvgLinkedIn = props => (
  <svg
    baseProfile='tiny'
    width={18}
    height={18}
    viewBox='0 0 24 24'
    fill={props.fill}
    xmlSpace='preserve'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M8 19H5V9h3v10zm11 0h-3v-5.342c0-1.392-.496-2.085-1.479-2.085-.779 0-1.273.388-1.521 1.165V19h-3s.04-9 0-10h2.368l.183 2h.062c.615-1 1.598-1.678 2.946-1.678 1.025 0 1.854.285 2.487 1.001.637.717.954 1.679.954 3.03V19z' />
    <ellipse
      cx={6.5}
      cy={6.5}
      rx={1.55}
      ry={1.5}
    />
  </svg>
);

export default SvgLinkedIn;