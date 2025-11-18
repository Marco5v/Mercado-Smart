import React from 'react';

const BreadSliceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12,2A6,6 0 0,0 6,8C6,11.31 8.69,14 12,14A6,6 0 0,0 18,8C18,4.69 15.31,2 12,2M5,15V22H19V15H5Z" />
  </svg>
);

export default BreadSliceIcon;
