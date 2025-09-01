"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { IconBox, IconUsers, IconReceipt, IconLogout } from '@tabler/icons-react';

interface AdminDashboardProps {
  onSelect: (view: string) => void;
  activeView: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelect, activeView }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'products', label: 'Products', icon: <IconBox className="h-5 w-5" /> },
    { id: 'customers', label: 'Customers', icon: <IconUsers className="h-5 w-5" /> },
    { id: 'sales', label: 'Sales', icon: <IconReceipt className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400">Lesotho POS System</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700"
        >
          <IconLogout className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;