import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for savings groups
  const [savingsGroups, setSavingsGroups] = useState(() => {
    const storedGroups = localStorage.getItem('savingsGroups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });

  // State for active group
  const [activeGroup, setActiveGroup] = useState(() => {
    const storedActiveGroup = localStorage.getItem('activeGroup');
    return storedActiveGroup ? JSON.parse(storedActiveGroup) : null;
  });

  // State for savings transactions
  const [savings, setSavings] = useState(() => {
    const storedSavings = localStorage.getItem('savings');
    return storedSavings ? JSON.parse(storedSavings) : [];
  });

  // State for loans
  const [loans, setLoans] = useState(() => {
    const storedLoans = localStorage.getItem('loans');
    return storedLoans ? JSON.parse(storedLoans) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('savingsGroups', JSON.stringify(savingsGroups));
  }, [savingsGroups]);

  useEffect(() => {
    localStorage.setItem('activeGroup', JSON.stringify(activeGroup));
  }, [activeGroup]);

  useEffect(() => {
    localStorage.setItem('savings', JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  // Function to create a new savings group
  const createSavingsGroup = (groupData) => {
    const newGroup = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...groupData
    };
    setSavingsGroups([...savingsGroups, newGroup]);
    return newGroup;
  };

  // Function to select active group
  const selectGroup = (groupId) => {
    const group = savingsGroups.find(g => g.id === groupId);
    setActiveGroup(group);
  };

  // Function to add a savings transaction
  const addSavings = (savingsData) => {
    if (!activeGroup) return null;
    
    const newSavings = {
      id: Date.now().toString(),
      groupId: activeGroup.id,
      createdAt: new Date().toISOString(),
      ...savingsData
    };
    setSavings([...savings, newSavings]);
    return newSavings;
  };

  // Function to add a loan
  const addLoan = (loanData) => {
    if (!activeGroup) return null;
    
    const newLoan = {
      id: Date.now().toString(),
      groupId: activeGroup.id,
      createdAt: new Date().toISOString(),
      status: 'active',
      ...loanData
    };
    setLoans([...loans, newLoan]);
    return newLoan;
  };

  // Function to update loan status (e.g., mark as repaid)
  const updateLoanStatus = (loanId, status) => {
    const updatedLoans = loans.map(loan => 
      loan.id === loanId ? { ...loan, status } : loan
    );
    setLoans(updatedLoans);
  };

  // Function to get savings for active group
  const getGroupSavings = () => {
    if (!activeGroup) return [];
    return savings.filter(s => s.groupId === activeGroup.id);
  };

  // Function to get loans for active group
  const getGroupLoans = () => {
    if (!activeGroup) return [];
    return loans.filter(l => l.groupId === activeGroup.id);
  };

  // Calculate total savings for active group
  const calculateTotalSavings = () => {
    const groupSavings = getGroupSavings();
    return groupSavings.reduce((total, s) => total + Number(s.amount), 0);
  };

  // Calculate total outstanding loans for active group
  const calculateOutstandingLoans = () => {
    const groupLoans = getGroupLoans();
    return groupLoans
      .filter(l => l.status === 'active')
      .reduce((total, l) => total + Number(l.amount), 0);
  };

  // Value object to be provided to consumers
  const value = {
    savingsGroups,
    activeGroup,
    savings,
    loans,
    createSavingsGroup,
    selectGroup,
    addSavings,
    addLoan,
    updateLoanStatus,
    getGroupSavings,
    getGroupLoans,
    calculateTotalSavings,
    calculateOutstandingLoans
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
