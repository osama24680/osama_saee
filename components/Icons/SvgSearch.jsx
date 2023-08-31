import * as React from 'react';

const SvgSearch = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={37.28}
    height={37.186}
    viewBox={`0 0 ${props.width ?? 37.28} ${props.height ?? 37.186}`}
    {...props}
  >
    <g
      data-name='Group 28715'
      transform={`scale(${props.scale ?? 1})`}
    >
      <path
        data-name='Path 16308'
        d='M5.05 5.05a15.536 15.536 0 0 1 26.522 10.986 15.421 15.421 0 0 1-3.826 10.21l8.628 8.628a1.061 1.061 0 1 1-1.5 1.5l-8.628-8.628A15.536 15.536 0 0 1 .499 16.036 15.434 15.434 0 0 1 5.05 5.05Zm1.5 20.471a13.407 13.407 0 1 0 0-18.97 13.429 13.429 0 0 0 .001 18.97Z'
        fill={props.fill}
        stroke={props.fill}
      />
    </g>
  </svg>
);

export default SvgSearch;
