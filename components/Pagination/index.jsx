"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(currentPage - 2, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);

      if (end === totalPages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="border flex items-center justify-end border-t border-zinc-200 bg-white px-4 py-3 sm:px-6 mt-auto rounded-b-lg">
      <div className=" flex items-center  justify-between">
        <div>
          <nav className="isolate inline-flex gap-2" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-300 hover:bg-[rgb(var(--blue-100))] transition-all focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:hover:bg-transparent"
            >
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer transition-all ${
                  page === currentPage
                    ? "z-10 bg-[rgb(var(--btn))] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:outline-offset-0"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-md px-2 py-2 text-zinc-600 ring-1 ring-inset ring-zinc-300 hover:bg-[rgb(var(--blue-100))] transition-all focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer disabled:hover:bg-transparent"
            >
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
