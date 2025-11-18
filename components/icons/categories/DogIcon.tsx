import React from 'react';

const DogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M15,5L12.5,2.5L10,5L12.5,7.5L15,5M19,10V12H21V10H19M21.1,13.5C21.1,13.5 22,14.4 22,16C22,17.1 21.1,18 20,18H18V16H16V18H15V12.3L12.5,9.8L10,12.3V18H4C2.9,18 2,17.1 2,16V14C2,11.8 3.8,10 6,10H8V9C8,7.9 8.9,7 10,7H10.5L12.5,5L14.5,7H15C16.1,7 17,7.9 17,9V10H18C18.9,10 19.7,10.4 20.3,11H19V13H20.8C20.8,13.2 20.9,13.3 21.1,13.5Z" />
  </svg>
);

export default DogIcon;
