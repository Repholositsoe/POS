"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconHome,
  IconBox,
  IconShoppingCart,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconCurrencyDollar,
  IconReceipt,
  IconTrendingUp,
  IconClock,
  IconX,
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import StatsPopupBar from "./itempop";

// Types for our data
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type Order = {
  id: number;
  customer: string;
  items: number;
  total: number;
  status: "Preparing" | "Ready" | "Completed";
};

type SalesData = {
  total: number;
  transactions: number;
  average: number;
  comparison: number;
};

// Lesotho-specific data
const LESOTHO_CUSTOMERS = ["Thabo Mokoena", "Matseliso Mofokeng", "Lerato Ntai", "Teboho Molise", "Lineo Mphuti", "Khotso Motaung", "Maseqobela Molapo"];
const LESOTHO_PRODUCTS: Product[] = [
  { id: 1, name: "Pap en Vleis", price: 65.00, category: "Main Dish", stock: 42 },
  { id: 2, name: "Moroho", price: 25.00, category: "Side Dish", stock: 38 },
  { id: 3, name: "Motoho", price: 35.00, category: "Beverage", stock: 56 },
  { id: 4, name: "Sesotho Hat", price: 120.00, category: "Souvenir", stock: 22 },
  { id: 5, name: "Blanket", price: 350.00, category: "Souvenir", stock: 15 },
  { id: 6, name: "Mala", price: 45.00, category: "Snack", stock: 30 },
];

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);

  // Example stats (replace with Firebase later)
  const productStats = { available: 120, sold: 45, damaged: 3, returned: 7 };
  const salesStats = { available: 0, sold: 200, damaged: 2, returned: 10 };
  const customerStats = { available: 0, sold: 0, damaged: 0, returned: 0 };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Products",
      href: "#",
      onClick: () => setShowProducts(true),
      icon: <IconBox className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Sales",
      href: "#",
      onClick: () => setShowSales(true),
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Customers",
      href: "#",
      onClick: () => setShowCustomers(true),
      icon: <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Reports",
      href: "#",
      icon: <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[80vh]",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Admin",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard />

      <StatsPopupBar open={showProducts} onClose={() => setShowProducts(false)} stats={productStats} />
      <StatsPopupBar open={showSales} onClose={() => setShowSales(false)} stats={salesStats} />
      <StatsPopupBar open={showCustomers} onClose={() => setShowCustomers(false)} stats={customerStats} />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        POS System
      </motion.span>
    </a>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrders, setCurrentOrders] = useState<Order[]>([
    { id: 1, customer: "Thabo Mokoena", items: 3, total: 195.00, status: "Preparing" },
    { id: 2, customer: "Matseliso Mofokeng", items: 5, total: 325.00, status: "Ready" },
    { id: 3, customer: "Lerato Ntai", items: 2, total: 130.00, status: "Completed" },
  ]);

  const todaySales: SalesData = {
    total: 3245.80,
    transactions: 42,
    average: 77.28,
    comparison: 12
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const adjustQuantity = (productId: number, amount: number) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const checkout = () => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: Math.max(...currentOrders.map(o => o.id), 0) + 1,
      customer: LESOTHO_CUSTOMERS[Math.floor(Math.random() * LESOTHO_CUSTOMERS.length)],
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: total,
      status: "Preparing"
    };
    
    setCurrentOrders(prev => [...prev, newOrder]);
    setCart([]);
    
    alert(`Checkout successful! Order #${newOrder.id} has been placed. Total: M${total.toFixed(2)}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Ready":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="flex flex-1 overflow-auto">
      <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-6 dark:border-neutral-700 dark:bg-neutral-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard Overview
        </h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <IconCurrencyDollar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Today's Sales</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">M{todaySales.total.toFixed(2)}</h3>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              {todaySales.comparison > 0 ? (
                <IconTrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <IconX className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${todaySales.comparison > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {todaySales.comparison > 0 ? '+' : ''}{todaySales.comparison}% from yesterday
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <IconReceipt className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Transactions</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{todaySales.transactions}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Avg: M{todaySales.average.toFixed(2)}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <IconBox className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Products Sold</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">203</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{LESOTHO_PRODUCTS.length} different items</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Orders */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <IconShoppingCart className="h-5 w-5 mr-2" />
              Current Orders
            </h3>
            <div className="space-y-3">
              {currentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg dark:border-neutral-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Order #{order.id}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">M{order.total.toFixed(2)}</p>
                    <div className="flex items-center justify-end mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Products for Sale */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <IconTrendingUp className="h-5 w-5 mr-2" />
              Products
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {LESOTHO_PRODUCTS.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg dark:border-neutral-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">M{product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Shopping Cart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <IconShoppingCart className="h-5 w-5 mr-2" />
              Shopping Cart
            </h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg dark:border-neutral-700">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">M{item.product.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => adjustQuantity(item.product.id, -1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => adjustQuantity(item.product.id, 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">M{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>VAT (14%)</span>
                    <span>M{(cartTotal * 0.14).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>M{(cartTotal * 1.14).toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={checkout}
                    className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};