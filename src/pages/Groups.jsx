import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui';

const Groups = () => {
  const { savingsGroups, createSavingsGroup, selectGroup, activeGroup } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSavingsGroup(formData);
    setFormData({ name: '', description: '' });
    setShowForm(false);
  };

  const handleSelectGroup = (groupId) => {
    selectGroup(groupId);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Savings Groups</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
        >
          {showForm ? 'Cancel' : 'Create New Group'}
        </Button>
      </div>

      {/* Create Group Form */}
      {showForm && (
        <Card title="Create New Savings Group" className="mb-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Group Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter group name"
              required
            />
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter group description"
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" variant="primary">
                Create Group
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGroups.length > 0 ? (
          savingsGroups.map((group) => (
            <Card 
              key={group.id} 
              title={group.name}
              subtitle={`Created on ${formatDate(group.createdAt)}`}
              className={`${activeGroup?.id === group.id ? 'border-2 border-indigo-500' : ''}`}
            >
              <p className="text-gray-600 mb-4">
                {group.description || 'No description provided.'}
              </p>
              <Button 
                onClick={() => handleSelectGroup(group.id)}
                variant={activeGroup?.id === group.id ? 'secondary' : 'primary'}
                fullWidth
              >
                {activeGroup?.id === group.id ? 'Currently Active' : 'Select Group'}
              </Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 mb-4">No savings groups created yet.</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} variant="primary">
                Create Your First Group
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
