"use client";
import { useState } from "react";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";

const quickRanges = [
  { label: "Past week", days: 7 },
  { label: "Past month", days: 30 },
  { label: "Past 3 months", days: 90 },
  { label: "Past 6 months", days: 180 },
  { label: "Past year", days: 365 },
  { label: "Past 2 years", days: 730 },
];

interface Props {
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export default function DateFilterDropdown({ onDateChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedRangeLabel, setSelectedRangeLabel] = useState("Past 6 months");

  const applyQuickRange = (days: number, label: string) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const newRange = [{ startDate: start, endDate: end, key: "selection" }];
    setRange(newRange);
    setSelectedRangeLabel(label);
    onDateChange(start, end);
    setShowPicker(false);
  };

  const handleCalendarChange = (item: Range) => {
    setRange([item]);
    onDateChange(item.startDate!, item.endDate!);
  };

  return (
    <>
      <button
        onClick={() => setShowPicker(true)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
      >
        <FaCalendarAlt />
        {selectedRangeLabel}
      </button>
      {showPicker && (
        <div className="fixed inset-0 bg-gray-200/70 backdrop-sm z-50 flex justify-center items-center">
          <div className="relative flex bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            {/* Quick Ranges */}
            <div className="flex flex-col gap-2 text-sm text-gray-800 w-48 mr-4 border-r pr-2">
              {quickRanges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => applyQuickRange(r.days, r.label)}
                  className="hover:bg-gray-100 rounded px-4 py-2 text-left"
                >
                  {r.label}
                </button>
              ))}
            </div>
            {/* Calendar Styles */}
            <style jsx global>{`
              .rdrDateDisplayWrapper {
                display: none !important; /* Hides the date inputs */
              }
              .rdrDefinedRangesWrapper,
              .rdrStaticRanges {
                display: none !important; /* Hides built-in quick ranges */
              }
              .rdrDateRangePickerWrapper .rdrMonth:not(:first-child) {
                display: none; /* Shows only one month */
              }
            `}</style>
            <DateRangePicker
              ranges={range}
              onChange={handleCalendarChange}
              months={1}
              direction="horizontal"
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              maxDate={new Date()}
            />
          </div>
        </div>
      )}
    </>
  );
}
