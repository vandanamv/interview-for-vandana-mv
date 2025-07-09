// / File: spacex-dashboard/src/app/page.tsx
"use client";

import { useState } from "react";
import { useLaunches, EnrichedLaunch } from "@/hooks/useLaunches";
import LaunchModal from "@/components/LaunchModal";
import FilterTabs from "@/components/FilterTabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import DateFilterDropdown from "@/components/DateFilterDropdown";

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "successful" | "failed">("all");
  const [selectedLaunch, setSelectedLaunch] = useState<EnrichedLaunch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    end: new Date(),
  });

  // ✅ FIXED ARGUMENT STRUCTURE
const { launches, loading, error } = useLaunches({ filter, dateRange });

  const launchesPerPage = 12;
  const totalPages = Math.ceil(launches.length / launchesPerPage);
  const startIndex = (currentPage - 1) * launchesPerPage;
  const paginatedLaunches = launches.slice(startIndex, startIndex + launchesPerPage);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <DateFilterDropdown
            onDateChange={(start, end) => {
              setDateRange({ start, end });
              setCurrentPage(1);
            }}
          />
          <FilterTabs
            current={filter}
            onChange={(f) => {
              setFilter(f);
              setCurrentPage(1);
            }}
          />
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-sm text-black">
            <thead className="bg-gray-100 text-black font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">No:</th>
                <th className="px-4 py-3 text-left">Launched (UTC)</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Mission</th>
                <th className="px-4 py-3 text-left">Orbit</th>
                <th className="px-4 py-3 text-left">Launch Status</th>
                <th className="px-4 py-3 text-left">Rocket</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-48">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : paginatedLaunches.length === 0 ? (
                <EmptyState message="No results found for the specified filter" />
              ) : (
                paginatedLaunches.map((launch, index) => (
                  <tr
                    key={launch.id}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => setSelectedLaunch(launch)}
                  >
                    <td className="px-4 py-3">
                      {(startIndex + index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(launch.date_utc).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZone: "UTC",
                      }).replace(",", " at")}
                    </td>
                    <td className="px-4 py-3">
                      {launch.launchpadData?.locality || "N/A"}
                    </td>
                    <td className="px-4 py-3">{launch.name}</td>
                    <td className="px-4 py-3">
                      {launch.payloadData?.orbit?.toUpperCase() || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {launch.upcoming ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full shadow-sm">
                          Upcoming
                        </span>
                      ) : launch.success === true ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
                          Success
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full shadow-sm">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {launch.rocketData?.name || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 pr-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        <LaunchModal
  launch={selectedLaunch}
  onClose={() => setSelectedLaunch(null)}
/>

      </main>
    </div>
  );
}

