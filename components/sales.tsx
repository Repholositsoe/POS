"use client";
import React, { useState, useEffect } from "react";
import {
  IconCalendar,
  IconFilter,
  IconDownload,
  IconReceipt,
  IconUser,
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyZloty,
} from "@tabler/icons-react";

// Types for our sales data
type Sale = {
  id: number;
  customer: string;
  date: string;
  items: number;
  total: number;
  paymentMethod: string;
  status: "Completed" | "Refunded" | "Pending";
};

type SalesSummary = {
  totalSales: number;
  totalTransactions: number;
  averageOrderValue: number;
  comparison: number;
};

// Sample Lesotho-specific sales data
const LESOTHO_SALES: Sale[] = [
  { id: 1001, customer: "Thabo Mokoena", date: "2025-08-20", items: 3, total: 195.00, paymentMethod: "Cash", status: "Completed" },
  { id: 1002, customer: "Matseliso Mofokeng", date: "2025-08-20", items: 5, total: 325.00, paymentMethod: "Mobile Money", status: "Completed" },
  { id: 1003, customer: "Lerato Ntai", date: "2025-08-20", items: 2, total: 130.00, paymentMethod: "Card", status: "Completed" },
  { id: 1004, customer: "Teboho Molise", date: "2025-08-19", items: 4, total: 280.00, paymentMethod: "Cash", status: "Completed" },
  { id: 1005, customer: "Lineo Mphuti", date: "2025-08-19", items: 1, total: 65.00, paymentMethod: "Mobile Money", status: "Refunded" },
  { id: 1006, customer: "Khotso Motaung", date: "2025-08-19", items: 6, total: 450.00, paymentMethod: "Card", status: "Completed" },
  { id: 1007, customer: "Maseqobela Molapo", date: "2025-08-18", items: 2, total: 140.00, paymentMethod: "Cash", status: "Completed" },
  { id: 1008, customer: "Thabo Mokoena", date: "2025-08-18", items: 3, total: 195.00, paymentMethod: "Mobile Money", status: "Completed" },
];

const PAYMENT_METHODS = ["All", "Cash", "Card", "Mobile Money"];
const STATUS_OPTIONS = ["All", "Completed", "Refunded", "Pending"];

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>(LESOTHO_SALES);
  const [filteredSales, setFilteredSales] = useState<Sale[]>(LESOTHO_SALES);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [salesSummary, setSalesSummary] = useState<SalesSummary>({
    totalSales: 0,
    totalTransactions: 0,
    averageOrderValue: 0,
    comparison: 12, // percentage compared to previous period
  });

  // Calculate sales summary
  useEffect(() => {
    const completedSales = filteredSales.filter(sale => sale.status === "Completed");
    const totalSales = completedSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalTransactions = completedSales.length;
    const averageOrderValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;
    
    setSalesSummary({
      totalSales,
      totalTransactions,
      averageOrderValue,
      comparison: 12 // This would typically be calculated based on previous period
    });
  }, [filteredSales]);

  // Filter sales based on selected filters
  useEffect(() => {
    let result = sales;
    
    // Filter by date range
    if (dateRange.start && dateRange.end) {
      result = result.filter(sale => {
        const saleDate = new Date(sale.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return saleDate >= startDate && saleDate <= endDate;
      });
    }
    
    // Filter by payment method
    if (paymentMethod !== "All") {
      result = result.filter(sale => sale.paymentMethod === paymentMethod);
    }
    
    // Filter by status
    if (statusFilter !== "All") {
      result = result.filter(sale => sale.status === statusFilter);
    }
    
    setFilteredSales(result);
  }, [dateRange, paymentMethod, statusFilter, sales]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: "start" | "end") => {
    setDateRange(prev => ({ ...prev, [type]: e.target.value }));
  };

  const exportSalesData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Export functionality would be implemented here. Data ready for download.");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentIcon = (method: string) => {
    switch(method) {
      case "Cash":
        return <IconCurrencyZloty className="h-4 w-4" />;
      case "Card":
        return <IconReceipt className="h-4 w-4" />;
      case "Mobile Money":
        return <IconUser className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
          <button
            onClick={exportSalesData}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <IconDownload className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>

        {/* Sales Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <h3 className="text-2xl font-bold text-gray-900">M{salesSummary.totalSales.toFixed(2)}</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <IconCurrencyZloty className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {salesSummary.comparison > 0 ? (
                <IconTrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <IconTrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${salesSummary.comparison > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {salesSummary.comparison > 0 ? '+' : ''}{salesSummary.comparison}% from last period
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <h3 className="text-2xl font-bold text-gray-900">{salesSummary.totalTransactions}</h3>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <IconReceipt className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Avg: M{salesSummary.averageOrderValue.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refund Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">2.4%</h3>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <IconTrendingDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">3 refunds this period</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <IconFilter className="h-5 w-5 mr-2" />
            Filter Sales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => handleDateChange(e, "start")}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => handleDateChange(e, "end")}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {PAYMENT_METHODS.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setDateRange({ start: "", end: "" });
                setPaymentMethod("All");
                setStatusFilter("All");
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sale ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {getPaymentIcon(sale.paymentMethod)}
                        <span className="ml-1">{sale.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      M{sale.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSales.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No sales found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Payment Method Breakdown */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Cash</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Mobile Money</span>
                  <span className="text-sm font-medium text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">Card</span>
                  <span className="text-sm font-medium text-gray-900">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trends</h3>
            <div className="flex items-end h-40 space-x-2">
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-200 w-full rounded-t" style={{ height: '60%' }}></div>
                <span className="text-xs mt-1">Mon</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-300 w-full rounded-t" style={{ height: '75%' }}></div>
                <span className="text-xs mt-1">Tue</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-400 w-full rounded-t" style={{ height: '90%' }}></div>
                <span className="text-xs mt-1">Wed</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500 w-full rounded-t" style={{ height: '85%' }}></div>
                <span className="text-xs mt-1">Thu</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-600 w-full rounded-t" style={{ height: '95%' }}></div>
                <span className="text-xs mt-1">Fri</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-700 w-full rounded-t" style={{ height: '70%' }}></div>
                <span className="text-xs mt-1">Sat</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-800 w-full rounded-t" style={{ height: '50%' }}></div>
                <span className="text-xs mt-1">Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;