import React from 'react';
import { User, KYCStatus } from '@/types/users';

interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSelectUser, selectedUserId }) => {
  const getStatusBadge = (status: KYCStatus) => {
    const styles = {
      'Approved': 'text-green-600',
      'Pending': 'text-amber-500',
      'Rejected': 'text-red-500',
      'Not initiated': 'text-gray-500',
    };
    
    return (
      <div className="flex items-center">
        <span className={`text-sm font-medium ${styles[status]}`}>{status}</span>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KYC Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => onSelectUser(user)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${selectedUserId === user.id ? 'bg-gray-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.kycStatus)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
