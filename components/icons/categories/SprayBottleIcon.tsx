import React from 'react';

const SprayBottleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12,6.5L9.5,4L6.5,4L6.5,2L12,2L12,3L14,4L12,6.5M19.5,9.5L18.5,8.5L16,11L15,10L12.5,12.5L14,14L15,13L17.5,15.5L16.5,16.5L19,19L21,19L21,17L19.5,9.5M4,22L12,14L10,12L2,20L4,22M3,11C3,11 5,13 5,15C5,17 3,19 3,19H4.5C4.5,19 6.5,17 6.5,15C6.5,13 4.5,11 4.5,11H3Z" />
  </svg>
);

export default SprayBottleIcon;
