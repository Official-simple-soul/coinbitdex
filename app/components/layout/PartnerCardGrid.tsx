import React from "react";
import PartnerCard from "./PartnerCard";
import { Advcash, Banxa, MoonPay, TradingView, Xanpool } from "~/utils/Svgs";

const partners = [
  { logo: <Advcash />, name: "Advcash" },
  { logo: <Banxa />, name: "Banxa" },
  { logo: <Xanpool />, name: "Xanpool" },
  { logo: <TradingView />, name: "TradingView" },
  { logo: <MoonPay />, name: "MoonPay" },
];

const PartnerCardGrid = () => {
  return (
    <div className="py-8">
      <h2 className="text-center text-4xl font-bold mb-2">Global Partners</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 px-2">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} logo={partner.logo} />
        ))}
      </div>
    </div>
  );
};

export default PartnerCardGrid;
