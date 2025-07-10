"use client";

import { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

type FilterType = "all" | "upcoming" | "successful" | "failed";

interface Props {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

export default function FilterTabs({ current, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const filters: { type: FilterType; label: string }[] = [
    { type: "all", label: "All Launches" },
    { type: "upcoming", label: "Upcoming Launches" },
    { type: "successful", label: "Successful Launches" },
    { type: "failed", label: "Failed Launches" },
  ];

  const selectedLabel =
    filters.find((f) => f.type === current)?.label || "All Launches";

  return (
    <div className="flex justify-end items-center gap-1 mb-4 relative z-10">
      <FaFilter className="text-gray-600 text-sm" />
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        >
          {selectedLabel}
          <FaChevronDown className="text-xs" />
        </button>

        {open && (
          <ul className="absolute top-6 right-0 w-44 bg-white shadow-lg rounded-md text-sm text-gray-700 border border-gray-200">
            {filters.map((filter) => (
              <li
                key={filter.type}
                onClick={() => {
                  onChange(filter.type);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  filter.type === current ? "font-semibold text-black" : ""
                }`}
              >
                {filter.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
