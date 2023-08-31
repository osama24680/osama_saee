import * as React from 'react';

const SvgUp = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={46}
    height={46}
    {...props}
  >
    <path
      d='M23 46A23 23 0 0 1 6.736 6.736a23 23 0 0 1 32.528 32.528A22.85 22.85 0 0 1 23 46Zm0-42.406A19.406 19.406 0 1 0 42.406 23 19.428 19.428 0 0 0 23 3.594Zm12.424 22.461L23 13.631 10.576 26.055l2.541 2.545L23 18.713l9.883 9.887Z'
      fill={props.fill}
    />
  </svg>
);

export default SvgUp;
