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
import StatsPopupBar from "./itempop"; // ✅ import the popup


// Simple Logo component (replace with your actual logo if needed)
function Logo() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="font-bold text-lg text-neutral-800 dark:text-neutral-100">POS</span>
    </div>
  );
}

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [showStats, setShowStats] = useState(false); // ✅ track popup state

  // Example stats (replace with Firebase data later)
  const stats = {
    available: 120,
    sold: 45,
    damaged: 3,
    returned: 7,
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Products",
      href: "#",
      onClick: () => setShowStats(true), // ✅ open popup
      icon: <IconBox className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Sales",
      href: "#",
      icon: <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Customers",
      href: "#",
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
        "h-[60vh]", // use `h-screen` for full height
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

      

      {/* ✅ Popup appears when Products clicked */}
      <StatsPopupBar open={showStats} onClose={() => setShowStats(false)} stats={stats} />
    </div>
  );
}
