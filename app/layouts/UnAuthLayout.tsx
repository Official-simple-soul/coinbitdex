import React, { type ReactNode } from "react";
import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";

interface UnAuthLayoutProps {
  children: ReactNode;
}

const UnAuthLayout: React.FC<UnAuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* <div className="absolute inset-0 bg-hero-bg bg-cover bg-center transform scale-100 transition-transform duration-500 will-change-transform"></div> */}

      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default UnAuthLayout;
