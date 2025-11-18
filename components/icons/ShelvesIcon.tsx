import React from 'react';

const ShelvesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M2 5h20" />
    <path d="M2 12h20" />
    <path d="M2 19h20" />
    <path d="M5 5v14" />
    <path d="M12 5v14" />
    <path d="M19 5v14" />
  </svg>
);

export default ShelvesIcon;
