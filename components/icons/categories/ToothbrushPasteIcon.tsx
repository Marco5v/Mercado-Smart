import React from 'react';

const ToothbrushPasteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M20,5V8H4V5H20M10,12H4V9H10V12M20,13H4V18C4,19.1 4.9,20 6,20H18C19.1,20 20,19.1 20,18V13M7.5,4C8.3,4 9,3.3 9,2.5C9,1.7 8.3,1 7.5,1C6.7,1 6,1.7 6,2.5C6,3.3 6.7,4 7.5,4M16.5,4C17.3,4 18,3.3 18,2.5C18,1.7 17.3,1 16.5,1C15.7,1 15,1.7 15,2.5C15,3.3 15.7,4 16.5,4Z" />
  </svg>
);

export default ToothbrushPasteIcon;
