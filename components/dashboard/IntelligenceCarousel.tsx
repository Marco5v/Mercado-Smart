import React from 'react';
import SpendingCard from './SpendingCard';
import AlertCard from './AlertCard';
import EconomyCard from './EconomyCard';

interface IntelligenceCarouselProps {
    spendingData: { current: number; budget: number };
    alertData: { count: number };
    economyData: { savings: number };
}

const IntelligenceCarousel: React.FC<IntelligenceCarouselProps> = ({ spendingData, alertData, economyData }) => {
  return (
    <div className="px-4 pt-5 pb-2">
      <div className="flex space-x-4 overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <SpendingCard current={spendingData.current} budget={spendingData.budget} />
        <AlertCard count={alertData.count} />
        <EconomyCard savings={economyData.savings} />
      </div>
    </div>
  );
};

export default IntelligenceCarousel;