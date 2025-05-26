import Market from '~/components/common/Market';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { mainWalletItems, summaryItems } from './data';
import SummaryDataComp from '~/components/common/SummaryDataComp';
import Frame from '~/components/common/Frame';
import { NavLink } from 'react-router';

function Dashboard() {
  const { user } = useAuth();
  const summaryData = user ? summaryItems(user) : [];

  return (
    <DashboardLayout pathname="dashboard">
      <div className="min-h-screen w-full">
        <h1 className="font-bold mb-6">Hi {user?.firstName}</h1>
        <Frame>
          {/* <div className="flex items-center justify-between text-gray-700"> */}
          <div className="space-y-4 text-gray-700">
            <div className="border-b pb-1">
              <h3 className="font-bold text-xs">Main Wallet</h3>
              <h1 className="text-xl font-bold">
                ${user?.balance?.toLocaleString()}
              </h1>
            </div>
            <div className="border-b pb-1">
              <h3 className="font-bold text-xs">Copy Trading Profit</h3>
              <h1 className="text-xl font-bold">
                ${user?.copy_trading_profit?.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-4 justify-between">
            {mainWalletItems.map((wallet, index) => (
              <NavLink
                to={wallet.to}
                key={index}
                className="flex flex-col items-center gap-2"
              >
                <img src={wallet.img} alt="" className="size-8" />
                <p className="text-xs">{wallet.title}</p>
              </NavLink>
            ))}
          </div>
        </Frame>
        <SummaryDataComp summaryData={summaryData} />
        <div className="mt-5 space-y-3">
          <Frame>
            <div className="grid grid-cols-10 justify-between">
              <div className="col-span-7">
                <img
                  src="/images/profit-summary.png"
                  alt=""
                  className="size-8"
                />
              </div>
              <div className="col-span-3">
                <h3 className="text-xs">Total Profit</h3>
                <h1 className="text-sm font-bold">${user?.total_profit}</h1>
              </div>
            </div>
          </Frame>
          <Frame>
            <div className="grid grid-cols-10  justify-between">
              <div className="col-span-7">
                <img src="/images/referrals.png" alt="" className="size-8 " />
              </div>
              <div className="col-span-3">
                <h3 className="text-xs">Referral Earn</h3>
                <h1 className="text-sm font-bold">${user?.referral_earn}</h1>
              </div>
            </div>
          </Frame>
        </div>
        <Market />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
