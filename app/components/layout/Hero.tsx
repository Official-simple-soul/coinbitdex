import React from "react";

const Hero: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
}> = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-3">
      <div>{icon}</div>
      <div>
        <p className="text-lg md:text-xl font-bold">{value}</p>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default Hero;

// const HeroStat: React.FC<{
//   icon: React.ReactNode;
//   value: string;
//   label: string;
// }> = ({ icon, value, label }) => (
//   <div className="flex items-center gap-4">
//     <div>{icon}</div>
//     <div>
//       <p className="text-xl font-bold">{value}</p>
//       <p className="text-gray-500">{label}</p>
//     </div>
//   </div>
// );
