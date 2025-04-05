import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui';

const Reports = () => {
  const { 
    activeGroup, 
    getGroupSavings, 
    getGroupLoans,
    calculateTotalSavings,
    calculateOutstandingLoans
  } = useAppContext();

  // If no active group is selected, show a message
  if (!activeGroup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Active Group Selected</h2>
        <p className="text-gray-500 mb-6">Please select a savings group to view reports.</p>
      </div>
    );
  }

  const savings = getGroupSavings();
  const loans = getGroupLoans();
  const totalSavings = calculateTotalSavings();
  const outstandingLoans = calculateOutstandingLoans();
  const availableFunds = totalSavings - outstandingLoans;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Group savings by month
  const savingsByMonth = savings.reduce((acc, saving) => {
    const date = new Date(saving.createdAt);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    
    acc[monthYear] += Number(saving.amount);
    return acc;
  }, {});

  // Group loans by month
  const loansByMonth = loans.reduce((acc, loan) => {
    const date = new Date(loan.createdAt);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    
    acc[monthYear] += Number(loan.amount);
    return acc;
  }, {});

  // Format month-year
  const formatMonthYear = (monthYear) => {
    const [year, month] = monthYear.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Get top savers
  const memberSavings = savings.reduce((acc, saving) => {
    if (!acc[saving.memberName]) {
      acc[saving.memberName] = 0;
    }
    
    acc[saving.memberName] += Number(saving.amount);
    return acc;
  }, {});

  const topSavers = Object.entries(memberSavings)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get top borrowers
  const memberLoans = loans.reduce((acc, loan) => {
    if (!acc[loan.memberName]) {
      acc[loan.memberName] = 0;
    }
    
    if (loan.status === 'active') {
      acc[loan.memberName] += Number(loan.amount);
    }
    
    return acc;
  }, {});

  const topBorrowers = Object.entries(memberLoans)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports & Statistics</h1>
      
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Savings" className="bg-blue-50 border-l-4 border-blue-500">
          <div className="text-3xl font-bold text-blue-700">{formatCurrency(totalSavings)}</div>
        </Card>
        
        <Card title="Outstanding Loans" className="bg-red-50 border-l-4 border-red-500">
          <div className="text-3xl font-bold text-red-700">{formatCurrency(outstandingLoans)}</div>
        </Card>
        
        <Card title="Available Funds" className="bg-green-50 border-l-4 border-green-500">
          <div className="text-3xl font-bold text-green-700">{formatCurrency(availableFunds)}</div>
        </Card>
      </div>
      
      {/* Monthly Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Savings */}
        <Card title="Monthly Savings">
          {Object.keys(savingsByMonth).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(savingsByMonth)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([monthYear, amount]) => (
                  <div key={monthYear} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">{formatMonthYear(monthYear)}</span>
                    <span className="text-green-600 font-semibold">{formatCurrency(amount)}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No savings data available.</p>
          )}
        </Card>
        
        {/* Monthly Loans */}
        <Card title="Monthly Loans">
          {Object.keys(loansByMonth).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(loansByMonth)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([monthYear, amount]) => (
                  <div key={monthYear} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">{formatMonthYear(monthYear)}</span>
                    <span className="text-red-600 font-semibold">{formatCurrency(amount)}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No loan data available.</p>
          )}
        </Card>
      </div>
      
      {/* Member Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Savers */}
        <Card title="Top Savers">
          {topSavers.length > 0 ? (
            <div className="space-y-2">
              {topSavers.map(([memberName, amount], index) => (
                <div key={memberName} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-2 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{memberName}</span>
                  </div>
                  <span className="text-green-600 font-semibold">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No savings data available.</p>
          )}
        </Card>
        
        {/* Top Borrowers */}
        <Card title="Top Borrowers (Active Loans)">
          {topBorrowers.length > 0 ? (
            <div className="space-y-2">
              {topBorrowers.map(([memberName, amount], index) => (
                <div key={memberName} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-800 rounded-full mr-2 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{memberName}</span>
                  </div>
                  <span className="text-red-600 font-semibold">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No active loans data available.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Reports;
