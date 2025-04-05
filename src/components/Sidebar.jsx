import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { activeGroup } = useAppContext();
  
  // If no active group is selected, don't show the sidebar
  if (!activeGroup) return null;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/members', label: 'Members', icon: '👥' },
    { path: '/savings', label: 'Savings', icon: '💰' },
    { path: '/loans', label: 'Loans', icon: '💸' },
    { path: '/reports', label: 'Reports', icon: '📝' },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{activeGroup.name}</h2>
        <p className="text-sm text-gray-500">Savings Group</p>
      </div>
      
      <nav className="mt-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path
                  ? 'nav-link-active'
                  : 'nav-link-inactive'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 mt-8">
        <div className="bg-primary-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-primary-800">Group Balance</h3>
          <p className="text-2xl font-bold text-primary-900 mt-1">$12,345</p>
          <div className="mt-3 text-xs font-medium text-primary-700">
            <span className="inline-flex items-center">
              <span>↗</span>
              <span className="ml-1">12% from last month</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
