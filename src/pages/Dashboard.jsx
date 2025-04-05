import { useState } from 'react';
import { Card, Button } from '../components/ui';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Button variant="primary">New Transaction</Button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-1 inline-flex space-x-1">
        <button 
          className={`btn-tab ${activeTab === 'overview' ? 'btn-tab-active' : 'btn-tab-inactive'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`btn-tab ${activeTab === 'transactions' ? 'btn-tab-active' : 'btn-tab-inactive'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`btn-tab ${activeTab === 'analytics' ? 'btn-tab-active' : 'btn-tab-inactive'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Group Summary" 
          className="md:col-span-2"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Members</div>
                <div className="text-2xl font-bold text-primary-900">24</div>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Active Loans</div>
                <div className="text-2xl font-bold text-primary-900">8</div>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Savings</div>
                <div className="text-2xl font-bold text-primary-900">$12,450</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Group Balance" variant="primary">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-primary-700">Current Balance</div>
              <div className="text-3xl font-bold text-primary-900">$15,245</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Savings</span>
                <span className="font-medium">$12,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Interest</span>
                <span className="font-medium">$2,795</span>
              </div>
            </div>
            
            <div className="text-xs text-primary-700 flex items-center">
              <span className="mr-1">↗</span>
              <span>12% from last month</span>
            </div>
          </div>
        </Card>
        
        <Card 
          title="Recent Transactions" 
          className="md:col-span-2"
        >
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-3 py-1">
              <div className="text-sm font-medium">John Doe - Savings Deposit</div>
              <div className="text-xs text-gray-500">Today at 10:30 AM • $250</div>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-3 py-1">
              <div className="text-sm font-medium">Jane Smith - Loan Repayment</div>
              <div className="text-xs text-gray-500">Yesterday at 2:45 PM • $120</div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3 py-1">
              <div className="text-sm font-medium">Robert Johnson - Savings Deposit</div>
              <div className="text-xs text-gray-500">Apr 3, 2025 at 9:12 AM • $300</div>
            </div>
          </div>
        </Card>
        
        <Card title="Loan Status" variant="default">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Active Loans</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="text-xs text-gray-500">
              85% repayment rate
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
