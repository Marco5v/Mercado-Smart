import React from 'react';

const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.75v9.75c0 1.243.75 2.17 1.802 2.324a22.32 22.32 0 001.134.175 2.31 2.31 0 011.64.925l.841 1.256a2.31 2.31 0 002.083.925h3.333a2.31 2.31 0 002.083-.925l.841-1.256a2.31 2.31 0 011.64-.925 22.32 22.32 0 001.134-.175c1.052-.154 1.802-1.081 1.802-2.324v-9.75c0-1.243-.75-2.17-1.802-2.324a22.32 22.32 0 00-1.134-.175 2.31 2.31 0 01-1.64-.925l-.841-1.256a2.31 2.31 0 00-2.083-.925H9.166a2.31 2.31 0 00-2.083.925l-.841 1.256zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
    />
  </svg>
);

export default CameraIcon;
