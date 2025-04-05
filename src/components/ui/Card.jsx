const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  className = '',
  variant = 'default',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border border-primary-100',
    dark: 'bg-dark-900 text-white border border-dark-800'
  };

  return (
    <div 
      className={`rounded-lg shadow-sm overflow-hidden ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
