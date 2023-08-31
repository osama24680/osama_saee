import * as React from 'react';

const SvgTelegram = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={28.716}
    height={24.075}
    {...props}
  >
    <g
      data-name='telegram (1)'
      transform={`scale(${props.scale ?? 1})`}
    >
      <path
        data-name='Path 16300'
        d='M1.337 9.94 26.803.121c1.182-.427 2.214.288 1.831 2.076L24.3 22.622c-.321 1.448-1.182 1.8-2.386 1.118l-6.598-4.864-3.19 3.066a1.665 1.665 0 0 1-1.332.649l.469-6.72L23.501 4.815c.533-.469-.119-.733-.821-.266L7.557 14.071l-6.52-2.034c-1.415-.449-1.446-1.415.3-2.1Z'
        fill={props.fill}
      />
    </g>
  </svg>
);

export default SvgTelegram;
