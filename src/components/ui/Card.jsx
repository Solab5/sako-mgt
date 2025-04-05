const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="p-4 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
