import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui';

const Members = () => {
  const { activeGroup } = useAppContext();
  const [members, setMembers] = useState(() => {
    const storedMembers = localStorage.getItem(`members_${activeGroup?.id}`);
    return storedMembers ? JSON.parse(storedMembers) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    joinDate: new Date().toISOString().split('T')[0],
  });

  // If no active group is selected, show a message
  if (!activeGroup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Active Group Selected</h2>
        <p className="text-gray-500 mb-6">Please select a savings group to manage members.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now().toString(),
      ...formData,
    };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem(`members_${activeGroup.id}`, JSON.stringify(updatedMembers));
    setFormData({
      name: '',
      phone: '',
      email: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const handleDelete = (memberId) => {
    const updatedMembers = members.filter(member => member.id !== memberId);
    setMembers(updatedMembers);
    localStorage.setItem(`members_${activeGroup.id}`, JSON.stringify(updatedMembers));
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
        <h1 className="text-2xl font-bold text-gray-800">Group Members</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
        >
          {showForm ? 'Cancel' : 'Add New Member'}
        </Button>
      </div>

      {/* Add Member Form */}
      {showForm && (
        <Card title="Add New Member" className="mb-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter member's full name"
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            <Input
              label="Join Date"
              name="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" variant="primary">
                Add Member
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Members List */}
      <Card title="Members List">
        {members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(member.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDelete(member.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No members added yet.</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} variant="primary">
                Add Your First Member
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Members;
