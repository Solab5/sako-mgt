import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
