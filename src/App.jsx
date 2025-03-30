import { useState } from "react";

export default function PageSelector() {
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const [selectedPages, setSelectedPages] = useState(() =>
    Object.fromEntries([["all", false], ...pageNumbers.map((num) => [`page${num}`, false])])
  );

  const [hoveredCheckbox, setHoveredCheckbox] = useState(null);

  const handleAllPages = () => {
    const newAllValue = !selectedPages.all;
    setSelectedPages((prev) => ({
      all: newAllValue,
      ...Object.fromEntries(pageNumbers.map((num) => [`page${num}`, newAllValue])),
    }));
  };

  const handlePageChange = (page) => {
    setSelectedPages((prev) => {
      const updatedPages = { ...prev, [page]: !prev[page] };
      updatedPages.all = pageNumbers.every((num) => updatedPages[`page${num}`]);
      return updatedPages;
    });
  };

  const handleDone = () => {
    const selected = Object.keys(selectedPages).filter((key) => selectedPages[key]);
    alert(`Selected: ${selected.join(", ")}`);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50 p-4">
      <div className="max-w-sm w-full h-auto md:h-[326px] rounded-lg border border-[#EEEEEE] p-4 bg-white shadow-md">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-montserrat text-sm font-normal leading-[130%] tracking-[0px]">All pages</span>
          <Checkbox
            isChecked={selectedPages.all}
            isHovered={hoveredCheckbox === "all"}
            onClick={handleAllPages}
            onMouseEnter={() => setHoveredCheckbox("all")}
            onMouseLeave={() => setHoveredCheckbox(null)}
          />
        </div>

        <div className="max-h-48 overflow-y-auto hide-scrollbar">
          {pageNumbers.map((pageNumber) => {
            const pageKey = `page${pageNumber}`;
            return (
              <div key={pageKey} className="py-2 flex items-center justify-between">
                <span className="font-montserrat text-sm font-normal leading-[130%] tracking-[0px]">
                  Page {pageNumber}
                </span>
                <Checkbox
                  isChecked={selectedPages[pageKey]}
                  isHovered={hoveredCheckbox === pageKey}
                  onClick={() => handlePageChange(pageKey)}
                  onMouseEnter={() => setHoveredCheckbox(pageKey)}
                  onMouseLeave={() => setHoveredCheckbox(null)}
                />
              </div>
            );
          })}
        </div>

        <div className="border-t mt-2 mb-4"></div>
        <button
          className="bg-[#FFCE22] hover:bg-[#FFD84D] text-center w-full px-5 py-3 rounded-md transition font-montserrat text-sm font-normal leading-[130%]"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}

function Checkbox({ isChecked, isHovered, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      className={`w-6 h-6 flex items-center justify-center rounded-md border transition duration-200 cursor-pointer
        ${isChecked ? "bg-blue-500 border-transparent" : "bg-white border-gray-300"}
        ${isHovered ? "border-gray-400 shadow-md shadow-gray-600/50" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isChecked ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      ) : isHovered ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-4 h-4 opacity-40">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      ) : null}
    </div>
  );
}
