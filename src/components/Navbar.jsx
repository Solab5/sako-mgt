import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { activeGroup } = useAppContext();

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Sako</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {activeGroup && (
              <span className="mr-4 font-medium">
                Active Group: {activeGroup.name}
              </span>
            )}
            <Link 
              to="/groups" 
              className="bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Manage Groups
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
