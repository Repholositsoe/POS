"use client";
import React, { useState, useEffect } from "react";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconX,
  IconCheck,
  IconUser,
  IconPhone,
  IconMail,
  IconMapPin,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";

// Types for our customer data
type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastVisit: string;
  isFavorite: boolean;
};

// Sample Lesotho-specific customer data
const LESOTHO_CUSTOMERS: Customer[] = [
  { id: 1, firstName: "Thabo", lastName: "Mokoena", phone: "+266 1234 5678", email: "thabo@example.com", address: "123 Main St", city: "Maseru", loyaltyPoints: 450, totalSpent: 2450.00, lastVisit: "2025-08-20", isFavorite: true },
  { id: 2, firstName: "Matseliso", lastName: "Mofokeng", phone: "+266 2345 6789", email: "matseliso@example.com", address: "456 Kingsway", city: "Maseru", loyaltyPoints: 320, totalSpent: 1825.00, lastVisit: "2025-08-19", isFavorite: false },
  { id: 3, firstName: "Lerato", lastName: "Ntai", phone: "+266 3456 7890", email: "lerato@example.com", address: "789 Hillside", city: "Teyateyaneng", loyaltyPoints: 280, totalSpent: 1560.00, lastVisit: "2025-08-18", isFavorite: true },
  { id: 4, firstName: "Teboho", lastName: "Molise", phone: "+266 4567 8901", email: "teboho@example.com", address: "101 Valley Rd", city: "Mafeteng", loyaltyPoints: 190, totalSpent: 980.00, lastVisit: "2025-08-17", isFavorite: false },
  { id: 5, firstName: "Lineo", lastName: "Mphuti", phone: "+266 5678 9012", email: "lineo@example.com", address: "202 Mountain View", city: "Maseru", loyaltyPoints: 520, totalSpent: 3120.00, lastVisit: "2025-08-16", isFavorite: true },
  { id: 6, firstName: "Khotso", lastName: "Motaung", phone: "+266 6789 0123", email: "khotso@example.com", address: "303 River Side", city: "Leribe", loyaltyPoints: 210, totalSpent: 1125.00, lastVisit: "2025-08-15", isFavorite: false },
  { id: 7, firstName: "Maseqobela", lastName: "Molapo", phone: "+266 7890 1234", email: "maseqobela@example.com", address: "404 Highland Ave", city: "Berea", loyaltyPoints: 380, totalSpent: 1980.00, lastVisit: "2025-08-14", isFavorite: false },
];

const CITIES = ["Maseru", "Teyateyaneng", "Mafeteng", "Leribe", "Berea", "Mohale's Hoek", "Quthing", "Qacha's Nek", "Mokhotlong", "Thaba-Tseka"];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(LESOTHO_CUSTOMERS);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(LESOTHO_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, "id" | "loyaltyPoints" | "totalSpent" | "lastVisit">>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    isFavorite: false
  });

  // Filter customers based on search term and city
  useEffect(() => {
    let result = customers;
    
    if (searchTerm) {
      result = result.filter(customer => 
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (cityFilter !== "All") {
      result = result.filter(customer => customer.city === cityFilter);
    }
    
    setFilteredCustomers(result);
  }, [searchTerm, cityFilter, customers]);

  const handleAddCustomer = () => {
    if (!newCustomer.firstName || !newCustomer.lastName || !newCustomer.phone) {
      alert("Please fill in all required fields");
      return;
    }
    
    const customerToAdd: Customer = {
      ...newCustomer,
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      loyaltyPoints: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    
    setCustomers([...customers, customerToAdd]);
    setNewCustomer({ firstName: "", lastName: "", phone: "", email: "", address: "", city: "", isFavorite: false });
    setIsAdding(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
  };

  const handleUpdateCustomer = () => {
    if (!currentCustomer) return;
    
    setCustomers(customers.map(customer => 
      customer.id === currentCustomer.id ? currentCustomer : customer
    ));
    
    setIsEditing(false);
    setCurrentCustomer(null);
  };

  const handleDeleteCustomer = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, isFavorite: !customer.isFavorite } : customer
    ));
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentCustomer(null);
    setNewCustomer({ firstName: "", lastName: "", phone: "", email: "", address: "", city: "", isFavorite: false });
  };

  const formatCurrency = (amount: number) => {
    return `M${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <IconPlus className="h-5 w-5 mr-2" />
            Add Customer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100">
                <IconUser className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <h3 className="text-xl font-bold text-gray-900">{customers.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100">
                <IconStar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Loyal Customers</p>
                <h3 className="text-xl font-bold text-gray-900">{customers.filter(c => c.isFavorite).length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100">
                <IconMapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cities</p>
                <h3 className="text-xl font-bold text-gray-900">{new Set(customers.map(c => c.city)).size}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-yellow-100">
                <IconStarFilled className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Loyalty Points</p>
                <h3 className="text-xl font-bold text-gray-900">
                  {Math.round(customers.reduce((sum, c) => sum + c.loyaltyPoints, 0) / customers.length)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Cities</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <div className="text-gray-600 flex items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {filteredCustomers.length} customers found
              </span>
            </div>
          </div>
        </div>

        {/* Add/Edit Customer Form */}
        {(isAdding || isEditing) && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? "Add New Customer" : "Edit Customer"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={isAdding ? newCustomer.firstName : currentCustomer?.firstName || ""}
                  onChange={(e) => isAdding 
                    ? setNewCustomer({...newCustomer, firstName: e.target.value})
                    : setCurrentCustomer({...currentCustomer!, firstName: e.target.value})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Thabo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={isAdding ? newCustomer.lastName : currentCustomer?.lastName || ""}
                  onChange={(e) => isAdding 
                    ? setNewCustomer({...newCustomer, lastName: e.target.value})
                    : setCurrentCustomer({...currentCustomer!, lastName: e.target.value})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mokoena"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={isAdding ? newCustomer.phone : currentCustomer?.phone || ""}
                    onChange={(e) => isAdding 
                      ? setNewCustomer({...newCustomer, phone: e.target.value})
                      : setCurrentCustomer({...currentCustomer!, phone: e.target.value})
                    }
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+266 1234 5678"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={isAdding ? newCustomer.email : currentCustomer?.email || ""}
                    onChange={(e) => isAdding 
                      ? setNewCustomer({...newCustomer, email: e.target.value})
                      : setCurrentCustomer({...currentCustomer!, email: e.target.value})
                    }
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="customer@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={isAdding ? newCustomer.address : currentCustomer?.address || ""}
                    onChange={(e) => isAdding 
                      ? setNewCustomer({...newCustomer, address: e.target.value})
                      : setCurrentCustomer({...currentCustomer!, address: e.target.value})
                    }
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  value={isAdding ? newCustomer.city : currentCustomer?.city || ""}
                  onChange={(e) => isAdding 
                    ? setNewCustomer({...newCustomer, city: e.target.value})
                    : setCurrentCustomer({...currentCustomer!, city: e.target.value})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select City</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isFavorite"
                checked={isAdding ? newCustomer.isFavorite : currentCustomer?.isFavorite || false}
                onChange={(e) => isAdding 
                  ? setNewCustomer({...newCustomer, isFavorite: e.target.checked})
                  : setCurrentCustomer({...currentCustomer!, isFavorite: e.target.checked})
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFavorite" className="ml-2 block text-sm text-gray-900">
                Mark as favorite customer
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={isAdding ? handleAddCustomer : handleUpdateCustomer}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isAdding ? "Add Customer" : "Update Customer"}
              </button>
            </div>
          </div>
        )}

        {/* Customers List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loyalty Points
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.firstName} {customer.lastName}
                            </div>
                            {customer.isFavorite && (
                              <IconStarFilled className="h-4 w-4 text-yellow-400 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.city}</div>
                      <div className="text-sm text-gray-500">{customer.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {customer.loyaltyPoints} pts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.lastVisit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(customer.id)}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          {customer.isFavorite ? (
                            <IconStarFilled className="h-5 w-5" />
                          ) : (
                            <IconStar className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <IconEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <IconTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No customers found. Try a different search or add a new customer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;