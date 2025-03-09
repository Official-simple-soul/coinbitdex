import Market from '~/components/common/Market';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full">
        <h1 className="font-bold">Hi {user?.firstName}</h1>

        <div className="top mt-4">
          <h3 className="font-bold">Total Asset Value (USDT)</h3>
          <h1 className="text-3xl font-bold">${user?.balance || 0.0}</h1>
          <div className="flex items-center">
            <p>
              Bonus Balance: <span className="font-bold">$5000</span>
            </p>
            {/* claim button */}
            <button className="bg-blue-500 text-white px-2 py-1 ml-3 text-xs rounded">
              Claim Bonus
            </button>
          </div>
        </div>
        <Market />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
