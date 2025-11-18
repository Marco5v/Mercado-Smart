import React from 'react';

const BabyCarriageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M8,20A2,2 0 0,0 10,18A2,2 0 0,0 8,16A2,2 0 0,0 6,18A2,2 0 0,0 8,20M18,20A2,2 0 0,0 20,18A2,2 0 0,0 18,16A2,2 0 0,0 16,18A2,2 0 0,0 18,20M20,6H12.4L13.7,2.7C13.8,2.3 13.5,2 13.1,2H5C4.6,2 4.3,2.3 4.3,2.7L3,7.3V15.7C3,16.4 3.6,17 4.3,17H15.7C16.4,17 17,16.4 17,15.7V11H20C20.6,11 21,10.6 21,10V7C21,6.4 20.6,6 20,6M15,15H5V8H15V15M5,7V4H12.1L11.1,6.7C11,7 11.2,7.3 11.5,7.3C11.6,7.3 11.7,7.3 11.7,7.2L12.5,6H5Z" />
  </svg>
);

export default BabyCarriageIcon;
