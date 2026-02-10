import React from 'react';

const IconLoader = () => (
  <svg
    id="logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <title>Loader Logo</title>

    {/* LETTER A */}
    <g id="A" transform="translate(30, 26) scale(0.7)">
      <path
        d="M30 0 L52 60 H44 L39 46 H21 L16 60 H8 L30 0 Z M25 36 H35 L30 22 L25 36 Z"
        fill="currentColor"
      />
    </g>

    {/* HEX FRAME */}
    <path
      d="M50 5 L11 27 L11 72 L50 95 L89 73 L89 28 Z"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default IconLoader;
