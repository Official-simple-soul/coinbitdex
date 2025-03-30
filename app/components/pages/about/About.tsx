import React from 'react';
import UnAuthLayout from '~/layouts/UnAuthLayout';

function About() {
  return (
    <UnAuthLayout>
      <div className="flex flex-col gap-4 items-center max-w-5xl mx-auto px-3 md:px-0 text-sm md:text-base">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
          <img src="/about/about1.png" alt="" />
          <img src="/about/about2.png" alt="" />
        </div>
        <section>
          <h2 className="text-center font-bold text-xl">Mission and Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-3">
            <img src="/about/mission1.png" alt="" />
            <img src="/about/mission2.png" alt="" />
          </div>
        </section>
        <img src="/images/team.png" alt="" />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
          <img src="/about/mission1.png" alt="" />
          <img src="/about/mission2.png" alt="" />
        </div>
        <section>
          <h2 className="text-center font-bold text-xl">Compliance Matrix</h2>
          <p className="text-center text-sm">
            CoinbitDex is an international digital service financial institution
            with branch offices in North America, Canada, the EU etc. CoinbitDex
            has also registered or obtained regulatory approval to operate in
            other countries where it provides its services or carries on any
            form of business. CoinbitDex is the registered trademark of Bit
            Group, whose global subsidiaries and/or related entities have
            obtained the following regulatory licences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 mt-3">
            <img src="/about/usa.png" alt="" />
            <img src="/about/canada.png" alt="" />
            <img src="/about/australia.png" alt="" />
            <img src="/about/eu.png" alt="" />
          </div>
        </section>
      </div>
    </UnAuthLayout>
  );
}

export default About;
