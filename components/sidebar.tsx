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
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import StatsPopupBar from "./itempop"; // ✅ import popup

export function SidebarDemo() {
  const [open, setOpen] = useState(false);

  // ✅ separate state for each popup
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
      onClick: () => setShowProducts(true), // ✅ open products popup
      icon: <IconBox className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Sales",
      href: "#",
      onClick: () => setShowSales(true), // ✅ open sales popup
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Customers",
      href: "#",
      onClick: () => setShowCustomers(true), // ✅ open customers popup
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
        "h-[60vh]",
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

      {/* ✅ Popups for each section */}
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

// Dummy dashboard
const Dashboard = () => (
  <div className="flex flex-1">
    <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Welcome to your POS Dashboard
      </h2>
    </div>
  </div>
);
