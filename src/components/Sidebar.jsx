import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { activeGroup } = useAppContext();
  
  // If no active group is selected, don't show the sidebar
  if (!activeGroup) return null;

  const navItems = [
    { path: '/', label: 'Dashboard', showAlways: true },
    { path: '/savings', label: 'Savings', showAlways: false },
    { path: '/loans', label: 'Loans', showAlways: false },
    { path: '/members', label: 'Members', showAlways: false },
    { path: '/reports', label: 'Reports', showAlways: false },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{activeGroup.name}</h2>
        <p className="text-gray-400 text-sm">Savings Group</p>
      </div>
      
      <nav>
        <ul>
          {navItems.map((item) => (
            (item.showAlways || activeGroup) && (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
