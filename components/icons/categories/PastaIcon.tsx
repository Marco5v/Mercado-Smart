import React from 'react';

const PastaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M11,13V2H13V13H11M16,5V13H14V5H16M8,9V13H6V9H8M20,15A2,2 0 0,1 18,17H6A2,2 0 0,1 4,15V14H20V15M18,22H6A2,2 0 0,1 4,20V19H20V20A2,2 0 0,1 18,22Z" />
  </svg>
);

export default PastaIcon;
