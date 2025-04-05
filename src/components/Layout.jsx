import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const { activeGroup } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        {activeGroup && <Sidebar />}
        <main className={`flex-1 p-6 ${activeGroup ? 'ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
