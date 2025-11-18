import React from 'react';

const PackageVariantIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M20.9 10.1L12.5 5.2V5.2C12.3 5.1 12 5.2 12 5.5V18.2L16.2 20.6C16.4 20.7 16.6 20.6 16.7 20.4L20.9 10.4C21 10.3 21 10.2 20.9 10.1M7.8 20.6L12 18.2V5.5C12 5.2 11.7 5.1 11.5 5.2V5.2L3.1 10.1C3 10.2 3 10.3 3.1 10.4L7.3 20.4C7.4 20.6 7.6 20.7 7.8 20.6M16.5 2.6L12 5L7.5 2.6L12 0.3L16.5 2.6Z" />
  </svg>
);

export default PackageVariantIcon;
