import Market from '~/components/common/Market';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { mainWalletItems, summaryItems } from './data';
import SummaryDataComp from '~/components/common/SummaryDataComp';
import Frame from '~/components/common/Frame';
import { NavLink } from 'react-router';

function Dashboard() {
  const { user } = useAuth();
  const summaryData = summaryItems('');

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full">
        <h1 className="font-bold mb-6">Hi {user?.firstName}</h1>
        <Frame>
          <div className="flex items-center justify-between text-gray-700">
            <div className="">
              <h3 className="font-bold text-xs">Main Wallet</h3>
              <h1 className="text-2xl font-bold">${20.0}</h1>
            </div>
            <div className="">
              <h3 className="font-bold text-xs">Copy Trading Wallet</h3>
              <h1 className="text-2xl font-bold">${0.0}</h1>
            </div>
          </div>
          <div className="bottom grid grid-cols-4 justify-evenly">
            {mainWalletItems.map((wallet, index) => (
              <NavLink
                to={wallet.to}
                key={index}
                className="flex flex-col items-center gap-2"
              >
                <img src={wallet.img} alt="" className="size-12" />
                <p className="text-sm">{wallet.title}</p>
              </NavLink>
            ))}
          </div>
        </Frame>
        <SummaryDataComp summaryData={summaryData} />
        <Market />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
