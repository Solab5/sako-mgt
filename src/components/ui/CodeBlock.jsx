const CodeBlock = ({ 
  children, 
  language = 'javascript',
  title,
  className = '',
  ...props 
}) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-sm bg-dark-900 text-white" {...props}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {title && <span className="text-xs text-gray-400">{title}</span>}
          </div>
          <div className="text-xs text-gray-400">{language}</div>
        </div>
      )}
      <div className={`p-4 font-mono text-sm overflow-x-auto ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default CodeBlock;
