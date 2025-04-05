import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input, Select } from '../components/ui';

const Loans = () => {
  const { activeGroup, addLoan, getGroupLoans, updateLoanStatus } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: '',
    amount: '',
    interestRate: '',
    dueDate: '',
    notes: '',
  });

  // If no active group is selected, show a message
  if (!activeGroup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Active Group Selected</h2>
        <p className="text-gray-500 mb-6">Please select a savings group to manage loans.</p>
      </div>
    );
  }

  const loans = getGroupLoans();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert amount and interest rate to numbers
    const loanData = {
      ...formData,
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate || 0),
    };
    addLoan(loanData);
    setFormData({ memberName: '', amount: '', interestRate: '', dueDate: '', notes: '' });
    setShowForm(false);
  };

  const handleStatusChange = (loanId, newStatus) => {
    updateLoanStatus(loanId, newStatus);
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Loans</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
        >
          {showForm ? 'Cancel' : 'Add New Loan'}
        </Button>
      </div>

      {/* Add Loan Form */}
      {showForm && (
        <Card title="Add New Loan" className="mb-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Member Name"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="Enter member name"
              required
            />
            <Input
              label="Loan Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter loan amount"
              required
            />
            <Input
              label="Interest Rate (%)"
              name="interestRate"
              type="number"
              step="0.1"
              min="0"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="Enter interest rate (optional)"
            />
            <Input
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder="Select due date"
            />
            <Input
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" variant="primary">
                Add Loan
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Loans List */}
      <Card title="Loans History">
        {loans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(loan.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loan.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      {formatCurrency(loan.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.interestRate ? `${loan.interestRate}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.dueDate ? formatDate(loan.dueDate) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        loan.status === 'active' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {loan.status === 'active' ? 'Active' : 'Repaid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.status === 'active' ? (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleStatusChange(loan.id, 'repaid')}
                        >
                          Mark as Repaid
                        </Button>
                      ) : (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleStatusChange(loan.id, 'active')}
                        >
                          Mark as Active
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No loans recorded yet.</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} variant="primary">
                Add Your First Loan
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Loans;
