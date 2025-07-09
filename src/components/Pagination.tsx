// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPages = () => {
    const pages: (number | string)[] = [];

    // Always add the first page
    pages.push(1);

    // Add ellipsis after the first page only if the current page is more than 3 pages away
    if (currentPage > 3) {
      pages.push("...");
    }

    // Add pages around the current page
    if (currentPage > 2) {
      pages.push(currentPage - 1);
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }
    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 1);
    }

    // Add ellipsis before the last page if necessary
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always add the last page if it's not already included
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6 items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
      >
        &lt;
      </button>
      {getPages().map((item, idx) => (
        <button
          key={idx}
          disabled={item === "..." || item === currentPage}
          onClick={() => typeof item === "number" && onPageChange(item)}
          className={`mx-1 px-3 py-1 rounded ${
            item === currentPage
              ? "bg-blue-600 text-white"
              : item === "..."
              ? "cursor-default text-gray-500"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
