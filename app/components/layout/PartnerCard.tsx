import React from 'react';

interface PartnerProps {
  logo: React.ReactNode;
}

const PartnerCard: React.FC<PartnerProps> = ({ logo }) => {
  return (
    <div className="flex justify-center items-center border border-blue-500 p-5 bg-gray-800 min-h-40">
      {logo}
    </div>
  );
};

export default PartnerCard;
