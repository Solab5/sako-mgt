import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui';

const Savings = () => {
  const { activeGroup, addSavings, getGroupSavings } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: '',
    amount: '',
    notes: '',
  });

  // If no active group is selected, show a message
  if (!activeGroup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Active Group Selected</h2>
        <p className="text-gray-500 mb-6">Please select a savings group to manage savings.</p>
      </div>
    );
  }

  const savings = getGroupSavings();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert amount to number
    const savingsData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    addSavings(savingsData);
    setFormData({ memberName: '', amount: '', notes: '' });
    setShowForm(false);
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
        <h1 className="text-2xl font-bold text-gray-800">Savings Transactions</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
        >
          {showForm ? 'Cancel' : 'Add New Savings'}
        </Button>
      </div>

      {/* Add Savings Form */}
      {showForm && (
        <Card title="Add New Savings" className="mb-8">
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
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
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
                Add Savings
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Savings List */}
      <Card title="Savings History">
        {savings.length > 0 ? (
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
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savings.map((saving) => (
                  <tr key={saving.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(saving.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {saving.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      {formatCurrency(saving.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {saving.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No savings transactions recorded yet.</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} variant="primary">
                Add Your First Savings
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Savings;
