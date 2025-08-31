"use client";
import React from "react";
import StatsPopupBar from "./itempop";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SalesPopup({ open, onClose }: Props) {
  const salesStats = {
    available: 0,
    sold: 200,
    damaged: 2,
    returned: 10,
  };

  return (
    <StatsPopupBar
      open={open}
      onClose={onClose}
      stats={salesStats}
      
    />
  );
}
