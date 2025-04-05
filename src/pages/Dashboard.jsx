import { useAppContext } from '../context/AppContext';
import { Card, Button } from '../components/ui';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { 
    activeGroup, 
    calculateTotalSavings, 
    calculateOutstandingLoans,
    getGroupSavings,
    getGroupLoans
  } = useAppContext();

  // If no active group is selected, show a message to select or create a group
  if (!activeGroup) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Sako</h1>
        <p className="text-lg text-gray-600 mb-8">
          To get started, please select or create a savings group.
        </p>
        <Link to="/groups">
          <Button variant="primary" size="lg">
            Manage Savings Groups
          </Button>
        </Link>
      </div>
    );
  }

  const totalSavings = calculateTotalSavings();
  const outstandingLoans = calculateOutstandingLoans();
  const recentSavings = getGroupSavings().slice(0, 5);
  const recentLoans = getGroupLoans().slice(0, 5);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Total Savings" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="text-3xl font-bold">{formatCurrency(totalSavings)}</div>
          <div className="mt-2">
            <Link to="/savings" className="text-white underline">View Details</Link>
          </div>
        </Card>
        
        <Card title="Outstanding Loans" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <div className="text-3xl font-bold">{formatCurrency(outstandingLoans)}</div>
          <div className="mt-2">
            <Link to="/loans" className="text-white underline">View Details</Link>
          </div>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Savings */}
        <Card title="Recent Savings" subtitle="Last 5 transactions">
          {recentSavings.length > 0 ? (
            <div className="divide-y">
              {recentSavings.map((saving) => (
                <div key={saving.id} className="py-3 flex justify-between">
                  <div>
                    <div className="font-medium">{saving.memberName}</div>
                    <div className="text-sm text-gray-500">{formatDate(saving.createdAt)}</div>
                  </div>
                  <div className="font-semibold text-green-600">
                    {formatCurrency(saving.amount)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent savings transactions.</p>
          )}
          <div className="mt-4">
            <Link to="/savings">
              <Button variant="outline" size="sm">View All Savings</Button>
            </Link>
          </div>
        </Card>
        
        {/* Recent Loans */}
        <Card title="Recent Loans" subtitle="Last 5 transactions">
          {recentLoans.length > 0 ? (
            <div className="divide-y">
              {recentLoans.map((loan) => (
                <div key={loan.id} className="py-3 flex justify-between">
                  <div>
                    <div className="font-medium">{loan.memberName}</div>
                    <div className="text-sm text-gray-500">{formatDate(loan.createdAt)}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-semibold text-red-600">
                      {formatCurrency(loan.amount)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      loan.status === 'active' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {loan.status === 'active' ? 'Active' : 'Repaid'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent loan transactions.</p>
          )}
          <div className="mt-4">
            <Link to="/loans">
              <Button variant="outline" size="sm">View All Loans</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
